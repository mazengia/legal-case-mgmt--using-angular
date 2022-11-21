import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../../../../services/expense/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  constructor(private expenseService: ExpenseService, private route: Router) {}

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

  onCreateExpenseType = () => {
    this.route.navigate(['/home/create-expense']);
  };

  onUpdateExpenseType = (expenseId: number) => {
    console.log(expenseId);
    this.route.navigate(['/home/update-expense/', expenseId]);
  };
}
