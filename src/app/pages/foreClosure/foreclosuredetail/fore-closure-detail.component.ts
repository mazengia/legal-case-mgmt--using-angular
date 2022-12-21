import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {Appointment} from "../../../models/appointment";
import {ExpenseDetail} from "../../../models/expenseDetail";
import {Comments} from "../../../models/comments";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ActivatedRoute} from "@angular/router";
import {
  CreateUpdateExpenseDetailComponent
} from "../../welcome/components/settings/expense/expense-detail/create-update-expense-detail/create-update-expense-detail.component";
import {
  CreateUpdateAppointmentComponent
} from "../../appointment/create-update-appointment/create-update-appointment.component";
import {CreateUpdateAdvocateComponent} from "../../advocate/create-update-advocate/create-update-advocate.component";
import {ForeClosureService} from "../../../services/foreClosure/advocate.service";
import {
  CreateUpdateMortageDetailComponent
} from "../../welcome/components/settings/mortgage-types/mortage-detail/create-update-mortage-detail/create-update-mortage-detail.component";
import {
  CreateAuctionTypeComponent
} from "../../welcome/components/settings/auction-types/create-auction-type/create-auction-type.component";

@Component({
  selector: 'app-foreclosure-detail',
  templateUrl: './fore-closure-detail.component.html',
  styleUrls: ['./fore-closure-detail.component.scss']
})
export class ForeClosureDetailComponent implements OnInit {
  @ViewChild(
    'drawerTemplate',
    {static: false})
  drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  request: any;
  appointment: Appointment[] = [];
  expenseDetail: ExpenseDetail[] = [];
  foreClosures?: any;
  comment:Comments[]=[] ;
  pageSize = 10;
  pageNumber = 1;
  username: any;
  totalElements = 0;
  foreClosureId: any;

  constructor(
    private notification: NzNotificationService,
    private drawerService: NzDrawerService,
    private activatedRoute: ActivatedRoute,
    private foreClosureService: ForeClosureService
  ) {
  }

  ngOnInit(): void {
    this.foreClosureId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getForeClosureById(this.foreClosureId);
  }

  getForeClosureById(id: any) {
    this.foreClosureService.getForeClosureById(id).subscribe(
      res => {
        this.foreClosures = res ;
        console.log("fore",this.foreClosures);
      })
  }


  openExpenseDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateExpenseDetailComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} ExpenseDetail `,
      nzWidth:600,
      nzContent: CreateUpdateExpenseDetailComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getForeClosureById(this.foreClosureId);
    })
  }

  openAuctionTypeDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateAuctionTypeComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Auction-Type  `,
      nzWidth:600,
      nzContent: CreateAuctionTypeComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getForeClosureById(this.foreClosureId);
    })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateAppointmentComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Appointment `,
      nzWidth: 600,
      nzContent: CreateUpdateAppointmentComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getForeClosureById(this.foreClosureId);
    })
  }

  openDrawerAdvocate(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateAdvocateComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Advocate `,
      nzWidth: 600,
      nzContent: CreateUpdateAdvocateComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getForeClosureById(this.foreClosureId);
    })
  }

  openDrawerMortgageDetail(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateMortageDetailComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Mortgage `,
      nzWidth:600,
      nzContent: CreateUpdateMortageDetailComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getForeClosureById(this.foreClosureId);
    })
  }
}
