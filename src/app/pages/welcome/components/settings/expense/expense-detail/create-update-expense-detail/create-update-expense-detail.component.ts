import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs";
import {Litigation} from "../../../../../../../models/litigation";
import {ExpenseDetail} from "../../../../../../../models/expenseDetail";
import {ExpenseDetailService} from "../../../../../../../services/expense/expenseDetail.service";
import {ExpenseService} from "../../../../../../../services/expense/expense.service";
import {Expense} from "../../../../../../../models/expense";
import {LitigationService} from "../../../../../../../services/litigation/litigation.service";
import {Appointment} from "../../../../../../../models/appointment";
import {AppointmentService} from "../../../../../../../services/appointment/appointment.service";

@Component({
  selector: 'app-create-update-expense-detail',
  templateUrl: './create-update-expense-detail.component.html',
  styleUrls: ['./create-update-expense-detail.component.scss']
})
export class CreateUpdateExpenseDetailComponent implements OnInit {

  expenseDetailForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  submitted = false;
  appointment?: Appointment[] | undefined;
  litigation?:Litigation[] |undefined;
  expense?: Expense[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private expenseDetailService: ExpenseDetailService,
    private appointmentService:AppointmentService,
    private notificationService: NzNotificationService,
    private litigationService:LitigationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.expenseDetailForm = this.formBuilder.group({
      expense: this.formBuilder.group({
        expenseId: [null, [Validators.required]],
      }),
      litigation: this.formBuilder.group({
        litigationId: [null, [Validators.required]],
      }),
      judicialAppointment: this.formBuilder.group({
        appointmentId: [null, [Validators.required]],
      }),
      amount: [null, [Validators.required]],
      miscellaneous: [null, [Validators.required]],
      remark: [null, [Validators.required]]
    });

  }
  ngOnInit(): void {
    // this.getAppointment();
    this.getLitigation();
    this.getExpense();
    this.isAddMode = !this.value;
    if (this.value) {
      this.getExpenseDetailById();
    }
  }

  getExpenseDetailById() {
    this.expenseDetailService
      .getExpenseDetail(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.expenseDetailForm.controls['litigation'].patchValue(res.judicialAppointment?.litigation)
          this.expenseDetailForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.expenseDetailForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createMortgageDetail();
    } else {
      this.updateMortgageDetail();
    }
  }

  createMortgageDetail(): void {
    for (const key in this.expenseDetailForm.controls) {
      if (this.expenseDetailForm.controls.hasOwnProperty(key)) {
        this.expenseDetailForm.controls[key].markAsDirty();
        this.expenseDetailForm.controls[key].updateValueAndValidity();
      }
    }
// console.log("mor detil")
//     console.log(this.mortageDetailForm.value)
    this.expenseDetailService.createExpenseDetail(this.expenseDetailForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'ExpenseDetail  ',
            'ExpenseDetail  Successfully Created'
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

  updateMortgageDetail(): void {

    for (const key in this.expenseDetailForm.controls) {
      if (this.expenseDetailForm.controls.hasOwnProperty(key)) {
        this.expenseDetailForm.controls[key].markAsDirty();
        this.expenseDetailForm.controls[key].updateValueAndValidity();
      }
    }
    this.expenseDetailService
      .updateExpenseDetail(this.value, this.expenseDetailForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'ExpenseDetail',
            'ExpenseDetail Successfully Updated'
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
  getAppointment = (litigationId:any) => {
    this.appointment=[];
    // this.expenseDetailForm.controls[litigationId].markAsDirty();
      this.appointmentService.findJudicialAppointmentByLitigationLitigationId(litigationId).subscribe(
        res => {
          console.log(res)
          if(res._embedded) {
            this.appointment = res._embedded.judicialAppointmentDtoes;
          }
        })
  };


  getExpense = (pageNumber?: number, pageSize?: number) => {
    this.expenseService
      .getExpenses(pageNumber, pageSize)
      .subscribe((res) => {
        this.expense = res?._embedded.expenseDtoes;
      });
  };
  search = (event: any) => {
  };
}
