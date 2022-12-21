import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {MailNotificationTypeService} from 'src/app/services/mail-notification-type/mail-notification-type.service';
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs";

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
  @Input() value?: number;
  isAddMode = true;
  pageNumber: number = 0;
  pageSize: number = 10;
  submitted = false;

constructor(
    private mailNotificationTypeService: MailNotificationTypeService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
  private notificationService: NzNotificationService,
  private drawerRef: NzDrawerRef<string>
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
  this.isAddMode = !this.value;
  if (this.value) {
  this.getMailNotificationTypeById();
}
  }

  getMailNotificationTypeById() {
    this.mailNotificationTypeService
      .getMailNotificationType(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
           this.createMailTypeForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createMailTypeForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createMailNotificationType();
    } else {
      this.updateMailNotificationType();
    }
  }

  createMailNotificationType(): void {
    for (const key in this.createMailTypeForm.controls) {
      if (this.createMailTypeForm.controls.hasOwnProperty(key)) {
        this.createMailTypeForm.controls[key].markAsDirty();
        this.createMailTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.mailNotificationTypeService.createMailNotificationType(this.createMailTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'MailTyp  ',
            'MailTyp  Successfully Created'
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

  updateMailNotificationType(): void {

    for (const key in this.createMailTypeForm.controls) {
      if (this.createMailTypeForm.controls.hasOwnProperty(key)) {
        this.createMailTypeForm.controls[key].markAsDirty();
        this.createMailTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.mailNotificationTypeService
      .updateMailNotificationType(this.value, this.createMailTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Mail',
            'Mail-type Successfully Updated'
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
