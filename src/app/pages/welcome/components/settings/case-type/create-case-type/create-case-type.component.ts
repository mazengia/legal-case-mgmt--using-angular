import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CaseTypeService} from 'src/app/services/case-type/case-type.service';
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {CaseType} from "../../../../../../models/case-type";
import {finalize, first} from "rxjs";

@Component({
  selector: 'app-create-case-type',
  templateUrl: './create-case-type.component.html',
  styleUrls: ['./create-case-type.component.scss'],
})
export class CreateCaseTypeComponent implements OnInit {

  createCaseTypeForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  submitted = false;
  caseType?: CaseType[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private caseTypeService: CaseTypeService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.createCaseTypeForm = this.formBuilder.group({

      remark: [null, [Validators.required]],
      caseTypeName: [null, [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.getCaseTypeById();
    }
  }

  getCaseTypeById() {
    this.caseTypeService
      .getCaseType(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
           this.createCaseTypeForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createCaseTypeForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCaseType();
    } else {
      this.updateCaseType();
    }
  }

  createCaseType(): void {
    for (const key in this.createCaseTypeForm.controls) {
      if (this.createCaseTypeForm.controls.hasOwnProperty(key)) {
        this.createCaseTypeForm.controls[key].markAsDirty();
        this.createCaseTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.caseTypeService.createCaseType(this.createCaseTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'CaseType  ',
            'CaseType  Successfully Created'
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

  updateCaseType(): void {

    for (const key in this.createCaseTypeForm.controls) {
      if (this.createCaseTypeForm.controls.hasOwnProperty(key)) {
        this.createCaseTypeForm.controls[key].markAsDirty();
        this.createCaseTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.caseTypeService
      .updateCaseType(this.value, this.createCaseTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'CaseType',
            'CaseType Successfully Updated'
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
