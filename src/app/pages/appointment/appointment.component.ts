import {Component, OnInit} from '@angular/core';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {Appointment} from "../../models/appointment";
import {CreateUpdateAppointmentComponent} from "./create-update-appointment/create-update-appointment.component";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  constructor(
    private appointmentService: AppointmentService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  loading!: boolean;
  appointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.GetAppointment();
  }

  GetAppointment = () => {
    this.loading = true;
    this.appointmentService
      .getAppointment(this.pageIndex, this.pageSize)
      .subscribe(
        (res) => {
          console.log("res")
          console.log(res)
          console.log("res")
            this.loading = false;
            this.appointments = res?._embedded?.judicialAppointmentDtoes;

        },
        (error: any) => {
          this.loading = false;
        }
      );
  };


  onOpenLitigationDetails = (id: any) => {
    this.route.navigate(['/appointment-details/', id]);
  };

  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateAppointmentComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Appointment `,
      nzWidth:600,
      nzContent: CreateUpdateAppointmentComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.GetAppointment()
    })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
