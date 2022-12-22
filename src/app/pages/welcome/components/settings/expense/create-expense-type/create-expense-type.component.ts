import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {ExpenseService} from 'src/app/services/expense/expense.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {finalize, first} from "rxjs";
import {NzDrawerRef} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-create-expense-type',
  templateUrl: './create-expense-type.component.html',
  styleUrls: ['./create-expense-type.component.scss'],
})
export class CreateExpenseTypeComponent implements OnInit {
  createExpenseForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  submitted = false;
  @Input() value?: number;
  isAddMode = true;
  loading = false;

  constructor(
    private expenseService: ExpenseService,
    private formBuilder: FormBuilder,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.createExpenseForm = this.formBuilder.group({
      expenseName: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.getExpenseById();
    }
  }

  getExpenseById() {
    this.expenseService
      .getExpenses(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.createExpenseForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createExpenseForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createExpense();
    } else {
      this.updateExpense();
    }
  }

  createExpense(): void {
    for (const key in this.createExpenseForm.controls) {
      if (this.createExpenseForm.controls.hasOwnProperty(key)) {
        this.createExpenseForm.controls[key].markAsDirty();
        this.createExpenseForm.controls[key].updateValueAndValidity();
      }
    }
    this.expenseService.createExpense(this.createExpenseForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Expense  ',
            'Expense  Successfully Created'
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

  updateExpense(): void {

    for (const key in this.createExpenseForm.controls) {
      if (this.createExpenseForm.controls.hasOwnProperty(key)) {
        this.createExpenseForm.controls[key].markAsDirty();
        this.createExpenseForm.controls[key].updateValueAndValidity();
      }
    }
    this.expenseService
      .updateExpense(this.value, this.createExpenseForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Expense',
            'Expense Successfully Updated'
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
}
