import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CaseType} from "../../../models/case-type";
import {Advocate} from "../../../models/advocate";
import {Intervene} from "../../../models/intervene";
import {finalize, first} from "rxjs";
import {Employee} from "../../../models/employee";
import {Branch} from "../../../models/branch";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-create-update-advocate',
  templateUrl: './create-update-advocate.component.html',
  styleUrls: ['./create-update-advocate.component.scss']
})
export class CreateUpdateAdvocateComponent implements OnInit {
  litigation: any;
  advocateForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  accountNumber!: string;
  submitted = false;
  isBankPlaintiff = false;
  caseType?: CaseType[] | undefined;
  advocate?: Advocate[] | undefined;
  intervene?: Intervene[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;
  attorneyHandlingTheCase?: Employee[];
  branch?: Branch[];

  constructor(
    private formBuilder: FormBuilder,
    private advocateService: AdvocateService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.advocateForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, [Validators.required]],
      remark: [null, [Validators.required]],
      date: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.getAdvocateById();
    }
  }

  getAdvocateById() {
    this.advocateService
      .getAdvocateById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.advocateForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.advocateForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createAdvocate();
    } else {
      this.updateAdvocate();
    }
  }

  createAdvocate(): void {
    for (const key in this.advocateForm.controls) {
      if (this.advocateForm.controls.hasOwnProperty(key)) {
        this.advocateForm.controls[key].markAsDirty();
        this.advocateForm.controls[key].updateValueAndValidity();
      }
    }

    this.advocateService.createAdvocate(this.advocateForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Advocate  ',
            'Advocate  Successfully Created'
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

  updateAdvocate(): void {

    for (const key in this.advocateForm.controls) {
      if (this.advocateForm.controls.hasOwnProperty(key)) {
        this.advocateForm.controls[key].markAsDirty();
        this.advocateForm.controls[key].updateValueAndValidity();
      }
    }
    this.advocateService
      .updateAdvocate(this.value, this.advocateForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Litigation',
            'Litigation Successfully Updated'
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


  search = (event: any) => {
  }
}
