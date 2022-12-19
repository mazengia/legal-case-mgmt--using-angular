import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {MailNotificationTypeService} from 'src/app/services/mail-notification-type/mail-notification-type.service';

@Component({
  selector: 'app-create-mail-types',
  templateUrl: './create-mail-types.component.html',
  styleUrls: ['./create-mail-types.component.scss'],
})
export class CreateMailTypesComponent implements OnInit {
  createMailTypeForm!: FormGroup;
  loading!: boolean;
  isCreateMode!: boolean;
  mailNotificationTypeId!: number;
  mailType: any;

  constructor(
    private mailNotificationTypeService: MailNotificationTypeService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.mailNotificationTypeId = Number(
      this.activatedRoute.snapshot.paramMap.get('mailNotificationTypeId')
    );
    console.log('Mail type: ', this.mailNotificationTypeId);
    this.createMailTypeForm = this.formBuilder.group({
      mailTypeName: [null, [Validators.required]],
      numberOfDays: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isCreateMode = !this.mailNotificationTypeId;
    console.log(this.mailNotificationTypeId);
    this.mailNotificationTypeService
      .getMailNotificationType(Number(this.mailNotificationTypeId))
      .subscribe((res: any) => {
        this.mailType = res;
        console.log(this.mailType);
        this.createMailTypeForm.patchValue(res);
      });
  }

  submitMailType = () => {
    if (this.isCreateMode) {
      this.saveMailType();
      console.log('creating');
    } else {
      this.updateMailType();
      console.log('updating');
    }
  };

  updateMailType = () => {
    this.loading = true;
    console.log(this.createMailTypeForm?.value);
    this.mailNotificationTypeService
      .updateMailNotificationType(
        this.mailNotificationTypeId,
        this.createMailTypeForm?.value
      )
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.notification.create(
            'success',
            'Success!',
            `You have successfully updated mail type ${this.mailNotificationTypeId}`
          );
          this.onGetMailType();
        },
        (error: any) => {
          this.loading = false;
          this.notification.create(
            'error',
            'Creating mail Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };

  onGetMailType = () => {
    this.mailNotificationTypeService
      .getMailNotificationType(Number(this.mailNotificationTypeId))
      .subscribe((res: any) => {
        this.mailType = res;
        // console.log(this.mailType);
        // this.createMailTypeForm.patchValue(res);
      });
  };

  saveMailType = () => {
    this.loading = true;
    console.log(this.createMailTypeForm?.value);
    this.mailNotificationTypeService
      .createMailNotificationType(this.createMailTypeForm?.value)
      .subscribe(
        (res: any) => {
          // console.log(res);
          this.loading = false;
          this.notification.create(
            'success',
            'Success!',
            `You have successfully crete mail type ${this.mailNotificationTypeId}`
          );
          this.onGetMailType();
          this.createMailTypeForm.reset();
        },
        (error: any) => {
          console.log(error);
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Mail Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };
}
