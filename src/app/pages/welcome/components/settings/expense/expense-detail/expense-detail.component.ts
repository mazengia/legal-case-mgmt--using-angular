import {Component, OnInit} from '@angular/core';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {
  CreateUpdateExpenseDetailComponent
} from "./create-update-expense-detail/create-update-expense-detail.component";
import {ExpenseDetailService} from "../../../../../../services/expense/expenseDetail.service";
import {ExpenseDetail} from "../../../../../../models/expenseDetail";

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {
  constructor(
    private expenseDetailService: ExpenseDetailService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  totalElements:any = 0;
  loading!: boolean;
  expenseDetails: ExpenseDetail[] = [];
  pageIndex: number =1 ;
  pageSize: number = 10;
  inputValue: any;

  ngOnInit(): void {
    this.getExpenseDetail();
  }

  getExpenseDetail (reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.expenseDetailService
      .getExpensesDetail(this.pageIndex - 1, this.pageSize)
      .subscribe(
        (res) => {
          //   console.log("res")
            console.log(res)
          //   console.log("res")
          this.loading = false;
          this.expenseDetails = res?._embedded?.expenseDetailDtoes;
          this.totalElements = res?.page?.totalElements;
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };


  onOpenMortgageDetailDetails = (id: any) => {
    this.route.navigate(['/mortgage-detail-details/', id]);
  };

  openDrawer(id: any): void {
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
      this.getExpenseDetail()
    })
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
