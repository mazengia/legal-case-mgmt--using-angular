import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CaseTypeService } from 'src/app/pages/services/case-type/case-type.service';

@Component({
  selector: 'app-create-case-type',
  templateUrl: './create-case-type.component.html',
  styleUrls: ['./create-case-type.component.scss'],
})
export class CreateCaseTypeComponent implements OnInit {
  createCaseTypeForm!: FormGroup;
  loading!: boolean;
  isCreateMode!: boolean;

  caseTypeId!: number;

  constructor(
    private caseTypeService: CaseTypeService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.caseTypeId = Number(
      this.activatedRoute.snapshot.paramMap.get('caseTypeId')
    );
    console.log('Case type: ', this.caseTypeId);
    this.createCaseTypeForm = this.formBuilder.group({
      caseTypeName: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isCreateMode = !this.caseTypeId;
    console.log(this.caseTypeId);
    this.caseTypeService
      .getCaseType(Number(this.caseTypeId))
      .subscribe((res: any) => {
        this.createCaseTypeForm.patchValue(res);
      });
  }

  submitCaseType = () => {
    if (this.isCreateMode) {
      this.saveCaseType();
      console.log('creating');
    } else {
      this.updateCaseType();
      console.log('updating');
    }
  };

  updateCaseType = () => {
    this.loading = true;
    this.caseTypeService
      .updateCaseType(this.caseTypeId, this.createCaseTypeForm?.value)
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.notification.create(
            'success',
            'Success!',
            `You have successfully updated expense type ${this.caseTypeId}`
          );
        },
        (error: any) => {
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Expense Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };

  saveCaseType = () => {
    this.loading = true;
    console.log(this.createCaseTypeForm?.value);
    this.caseTypeService
      .createCaseType(this.createCaseTypeForm?.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.createCaseTypeForm.reset();
        },
        (error: any) => {
          console.log(error);
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Expense Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };
}
