import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MailNotificationType } from 'src/app/pages/models/mail-notification-type/mail-notification-type';
import { MailNotificationTypeService } from 'src/app/pages/services/mail-notification-type/mail-notification-type.service';
import { MortgageTypeService } from 'src/app/pages/services/mortgage-type/mortgage-type.service';

@Component({
  selector: 'app-create-mortgage-type',
  templateUrl: './create-mortgage-type.component.html',
  styleUrls: ['./create-mortgage-type.component.scss'],
})
export class CreateMortgageTypeComponent implements OnInit {
  createMortgageTypeForm!: FormGroup;
  loading!: boolean;
  isCreateMode!: boolean;

  mortgageTypeId!: number;
  mailTypes: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;

  compareFn(optionOne: any, optionTwo: any): boolean {
    return optionOne.id === optionTwo.id;
  }

  constructor(
    private mortgageTypeService: MortgageTypeService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private mailNotificationTypeService: MailNotificationTypeService
  ) {
    this.mortgageTypeId = Number(
      this.activatedRoute.snapshot.paramMap.get('mortgageTypeId')
    );
    console.log('Case type: ', this.mortgageTypeId);
    this.createMortgageTypeForm = this.formBuilder.group({
      mortgageTypeName: [null, [Validators.required]],
      mailNotificationType: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isCreateMode = !this.mortgageTypeId;
    console.log(this.mortgageTypeId);
    this.mortgageTypeService
      .getMortgageType(Number(this.mortgageTypeId))
      .subscribe((res: any) => {
        this.createMortgageTypeForm.patchValue(res);
      });

    this.onGetMailTypes(this.pageNumber, this.pageSize);
  }

  submitMortgageType = () => {
    if (this.isCreateMode) {
      this.saveMortgageType();
      console.log('creating');
    } else {
      this.updateMortgageType();
      console.log('updating');
    }
  };

  updateMortgageType = () => {
    this.loading = true;
    this.mortgageTypeService
      .updateMortgageType(
        this.mortgageTypeId,
        this.createMortgageTypeForm?.value
      )
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.notification.create(
            'success',
            'Success!',
            `You have successfully updated Mortgage type ${this.mortgageTypeId}`
          );
        },
        (error: any) => {
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Mortgage Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };

  saveMortgageType = () => {
    this.loading = true;
    console.log(this.createMortgageTypeForm?.value);
    this.mortgageTypeService
      .createMortgageType(this.createMortgageTypeForm?.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.createMortgageTypeForm.reset();
        },
        (error: any) => {
          console.log(error);
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Mortgage Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };

  onGetMailTypes = (pageNumber?: number, pageSize?: number) => {
    this.mailNotificationTypeService
      .getMailNotificationTypes(pageNumber, pageSize)
      .subscribe((res: any) => {
        this.mailTypes = res?._embedded?.mailNotificationTypeDtoes;
      });
  };

  search = (event: any) => {};
}
