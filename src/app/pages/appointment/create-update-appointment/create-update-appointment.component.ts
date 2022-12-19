import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize, first} from "rxjs";
import {LitigationService} from "../../../services/litigation/litigation.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {Litigation} from "../../../models/litigation";
import {Appointment} from "../../../models/appointment";
import {AppointmentService} from "../../../services/appointment/appointment.service";

@Component({
  selector: 'app-create-update-appointment',
  templateUrl: './create-update-appointment.component.html',
  styleUrls: ['./create-update-appointment.component.scss']
})
export class CreateUpdateAppointmentComponent implements OnInit {

  appointmentForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  submitted = false;
  isBankPlaintiff = false;
  litigation?: Litigation[] | undefined;
  appointment?: Appointment[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private litigationService: LitigationService,
    private appointmentService: AppointmentService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.appointmentForm = this.formBuilder.group({
      litigation: this.formBuilder.group({
        litigationId: [null, [Validators.required]],
      }),
      appointmentReason: [null, [Validators.required]],
      appointmentDate: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getLitigation();
    this.isAddMode = !this.value;
    if (this.value) {
      this.getAppointmentById();
    }
  }

  getAppointmentById() {
    this.appointmentService
      .getAppointmentById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.appointmentForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.appointmentForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createAppointment();
    } else {
      this.updateAppointment();
    }
  }

  createAppointment(): void {
    for (const key in this.appointmentForm.controls) {
      if (this.appointmentForm.controls.hasOwnProperty(key)) {
        this.appointmentForm.controls[key].markAsDirty();
        this.appointmentForm.controls[key].updateValueAndValidity();
      }
    }

    this.appointmentService.createAppointment(this.appointmentForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Appointment  ',
            'Appointment  Successfully Created'
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

  updateAppointment(): void {

    for (const key in this.appointmentForm.controls) {
      if (this.appointmentForm.controls.hasOwnProperty(key)) {
        this.appointmentForm.controls[key].markAsDirty();
        this.appointmentForm.controls[key].updateValueAndValidity();
      }
    }
    this.appointmentService
      .updateAppointment(this.value, this.appointmentForm.value)
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
  getLitigation = (pageNumber?: number, pageSize?: number) => {
    this.litigationService
      .getLitigations(pageNumber, pageSize)
      .subscribe((res) => {
        this.litigation = res?._embedded.litigationDtoes;
      });
  };
  search = (event: any) => {
  };
}
