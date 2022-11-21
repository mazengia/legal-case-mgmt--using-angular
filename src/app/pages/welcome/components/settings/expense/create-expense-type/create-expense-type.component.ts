import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from 'src/app/pages/services/expense/expense.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-expense-type',
  templateUrl: './create-expense-type.component.html',
  styleUrls: ['./create-expense-type.component.scss'],
})
export class CreateExpenseTypeComponent implements OnInit {
  createExpenseForm!: FormGroup;
  loading!: boolean;
  isCreateMode!: boolean;

  expenseId!: number;

  constructor(
    private expenseService: ExpenseService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.expenseId = Number(
      this.activatedRoute.snapshot.paramMap.get('expenseId')
    );
    console.log('expense Id: ', this.expenseId);
    this.createExpenseForm = this.formBuilder.group({
      expenseName: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isCreateMode = !this.expenseId;
    console.log(this.expenseId);
    this.expenseService
      .getExpense(Number(this.expenseId))
      .subscribe((res: any) => {
        this.createExpenseForm.patchValue(res);
      });
  }

  submitExpense = () => {
    if (this.isCreateMode) {
      this.saveExpenseType();
      console.log('creating');
    } else {
      this.updateExpenseType();
      console.log('updating');
    }
  };

  updateExpenseType = () => {
    this.loading = true;
    this.expenseService
      .updateExpense(this.expenseId, this.createExpenseForm?.value)
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.notification.create(
            'success',
            'Success!',
            `You have successfully updated expense type ${this.expenseId}`
          );
        },
        (error: any) => {
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Expense Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };

  saveExpenseType = () => {
    this.loading = true;
    console.log(this.createExpenseForm?.value);
    this.expenseService.createExpense(this.createExpenseForm?.value).subscribe(
      (res: any) => {
        console.log(res);
        this.createExpenseForm.reset();
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
        this.notification.create(
          'error',
          'Creating Expense Type Failed!',
          `error.error.apierror.message`
        );
      }
    );
  };
}
