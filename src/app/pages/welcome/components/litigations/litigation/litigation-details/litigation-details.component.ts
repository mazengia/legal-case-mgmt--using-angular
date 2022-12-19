import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExpenseService} from 'src/app/services/expense/expense.service';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {LitigationService} from "../../../../../../services/litigation/litigation.service";
import {AdvocateService} from "../../../../../../services/advocate/advocate.service";
import {AppointmentService} from "../../../../../../services/appointment/appointment.service";
import {Appointment} from "../../../../../../models/appointment";
import {
  CreateUpdateAppointmentComponent
} from "../../../../../appointment/create-update-appointment/create-update-appointment.component";
import {
  CreateUpdateAdvocateComponent
} from "../../../../../advocate/create-update-advocate/create-update-advocate.component";
import {
  CreateUpdateInterveneComponent
} from "../../../../../intervene/create-update-intervene/create-update-intervene.component";
import {ExpenseDetailService} from "../../../../../../services/expense/expenseDetail.service";
import {ExpenseDetail} from "../../../../../../models/expenseDetail";

@Component({
  selector: 'app-litigation-details',
  templateUrl: './litigation-details.component.html',
  styleUrls: ['./litigation-details.component.scss'],
})
export class LitigationDetailsComponent implements OnInit {
  @ViewChild(
    'drawerTemplate',
    {static: false})
  drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  request: any;
  appointment: Appointment[]=[];
  expenseDetails: ExpenseDetail[]=[];
  litigation: any;
  pageSize = 10;
  pageNumber = 1;
  username:any;
  totalElements = 0;
  age: number | undefined;
  litigationId: any;

  constructor(
    private notification: NzNotificationService,
    private drawerService: NzDrawerService,
    private activatedRoute: ActivatedRoute,
    private litigationService: LitigationService,
    private customerService: ExpenseService,
    private fundSourceService: LitigationService,
    private expenseDetailService:ExpenseDetailService,
    private appointmentService: AppointmentService,
    private advocateService:AdvocateService) {
  }

  ngOnInit(): void {
    this.litigationId = this.activatedRoute.snapshot.paramMap.get('litigationId');
    this.getLitigationById(this.litigationId);
    this.findJudicialAppointmentByLitigationLitigationId(this.litigationId);
  }

  getLitigationById(id: any) {
    this.litigationService.getLitigation(id).subscribe(
      res => {
        this.litigation = res;
      })
  }
  findExpenseDetailByAppointmentId(appointmentId:any){
    this.expenseDetailService.findExpenseDetailByAppointmentId(appointmentId).subscribe(
      res => {
        this.expenseDetails = res._embedded.expenseDetailDtoes;
      })
  }
  findJudicialAppointmentByLitigationLitigationId(id: any){
    this.appointmentService.findJudicialAppointmentByLitigationLitigationId(id).subscribe(
      res => {
        this.appointment = res._embedded.judicialAppointmentDtoes;
        for (let i=0;i<this.appointment.length;i++){
          this.findExpenseDetailByAppointmentId(this.appointment[i].appointmentId);

        }
        console.log("appointment",this.appointment)
      })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

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
      this.getLitigationById(this.litigationId);
      this.findJudicialAppointmentByLitigationLitigationId(this.litigationId);
    })
  }
  openDrawerAdvocate(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateAdvocateComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Advocate `,
      nzWidth:600,
      nzContent: CreateUpdateAdvocateComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getLitigationById(this.litigationId);
      this.findJudicialAppointmentByLitigationLitigationId(this.litigationId);
    })
  }
  openDrawerIntervene(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateInterveneComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Intervene `,
      nzWidth:600,
      nzContent: CreateUpdateInterveneComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getLitigationById(this.litigationId);
      this.findJudicialAppointmentByLitigationLitigationId(this.litigationId);

    })
  }
}
