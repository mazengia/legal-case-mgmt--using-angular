import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExpenseService} from '../../../../../services/expense/expense.service';
import {CreateCaseTypeComponent} from "../case-type/create-case-type/create-case-type.component";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {CreateExpenseTypeComponent} from "./create-expense-type/create-expense-type.component";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  constructor(private expenseService: ExpenseService,
              private drawerService: NzDrawerService,
              private route: Router) {}

  loading!: boolean;
  expenseTypes: any[] = [];

  ngOnInit(): void {
    this.onGetExpenseTypes();
  }
  onGetExpenseTypes = () => {
    this.loading = true;
    this.expenseService.getExpenses().subscribe(
      (res: any) => {
        setTimeout(() => {
          this.loading = false;
          this.expenseTypes = res?._embedded?.expenseDtoes;
          console.log(this.expenseTypes);
        }, 1000);
      },
      (error: any) => {
        this.loading = false;
      }
    );
  };

  openExpenseDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateExpenseTypeComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Expense-type `,
      nzWidth:600,
      nzContent: CreateExpenseTypeComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.onGetExpenseTypes()
    })
  }
}
