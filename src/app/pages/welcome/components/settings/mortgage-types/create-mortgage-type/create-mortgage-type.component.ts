import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {MailNotificationTypeService} from 'src/app/services/mail-notification-type/mail-notification-type.service';
import {MortgageTypeService} from 'src/app/services/mortgage-type/mortgage-type.service';
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs";
import {MortgageType} from "../../../../../../models/mortgage-type";

@Component({
  selector: 'app-create-mortgage-type',
  templateUrl: './create-mortgage-type.component.html',
  styleUrls: ['./create-mortgage-type.component.scss'],
})
export class CreateMortgageTypeComponent implements OnInit {
  createMortgageTypeForm!: FormGroup;
  loading!: boolean;
  mailTypes: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;


  submitted = false;
  @Input() value?: number;
  isAddMode = true;


  constructor(
    private mortgageTypeService: MortgageTypeService,
    private formBuilder: FormBuilder,
    private mailNotificationTypeService:MailNotificationTypeService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>,
    private activatedRoute: ActivatedRoute
  ) {
    this.createMortgageTypeForm = this.formBuilder.group({
      mortgageTypeName: [null, [Validators.required]],
      mailNotificationType: this.formBuilder.group({mailNotificationTypeId: ['', [Validators.required]]}),
      remark: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.isAddMode = !this.value;
    this.getMailTypes();
    if (this.value) {
      this.getMortgageTypeById();
    }
  }

  getMailTypes = (pageNumber?: number, pageSize?: number) => {
    this.mailNotificationTypeService
      .getMailNotificationTypes(pageNumber , pageSize )
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.mailTypes = res?._embedded?.mailNotificationTypeDtoes;
            console.log("mailTypes",this.mailTypes);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };

  getMortgageTypeById() {
    this.mortgageTypeService
      .getMortgageTypeById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.createMortgageTypeForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createMortgageTypeForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createMortgageType();
    } else {
      this.updateMortgageType();
    }
  }

  createMortgageType(): void {
    for (const key in this.createMortgageTypeForm.controls) {
      if (this.createMortgageTypeForm.controls.hasOwnProperty(key)) {
        this.createMortgageTypeForm.controls[key].markAsDirty();
        this.createMortgageTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.mortgageTypeService.createMortgageType(this.createMortgageTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'MortgageType  ',
            'MortgageType  Successfully Created'
          );
        },
        (error) => {
          console.log('error = ', error)
          this.createNotification(
            'error',
            'Error',
            error.apierror.debugMessage);
        }
      );
  }

  updateMortgageType(): void {

    for (const key in this.createMortgageTypeForm.controls) {
      if (this.createMortgageTypeForm.controls.hasOwnProperty(key)) {
        this.createMortgageTypeForm.controls[key].markAsDirty();
        this.createMortgageTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.mortgageTypeService
      .updateMortgageType(this.value, this.createMortgageTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'MortgageType',
            'MortgageType Successfully Updated'
          );
        },
        error => {
          this.createNotification(
            'error',
            'Error',
            error.apierror.debugMessage);
        }
      );
  }

  createNotification(type: string, title: string, message: string): void {
    this.notificationService.create(type, title, message);
  }
}
