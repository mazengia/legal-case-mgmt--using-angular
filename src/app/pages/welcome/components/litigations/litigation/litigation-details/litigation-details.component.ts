import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationHandler } from 'angular-oauth2-oidc';
import {
  delay,
  finalize,
  map,
  merge,
  Observable,
  scan,
  Subject,
  timer,
} from 'rxjs';
import { ExpenseService } from 'src/app/pages/services/expense/expense.service';
import { JudicialReportService } from 'src/app/pages/services/judicial-report/judicial-report.service';

@Component({
  selector: 'app-litigation-details',
  templateUrl: './litigation-details.component.html',
  styleUrls: ['./litigation-details.component.scss'],
})
export class LitigationDetailsComponent implements OnInit {
  judicialReportForm!: FormGroup;

  panels = [
    {
      active: false,
      name: 'This is panel header 1',
      arrow: true,
    },
    {
      active: false,
      arrow: true,
      name: 'This is panel header 2',
    },
  ];

  steps: any[] = [
    {
      id: 1,
      title: `Step 1`,
      description: `stepOn`,
      async: false,
      percentage: null,
    },
    {
      id: 2,
      title: `Step 2`,
      description: `This step is asynchronous.`,
      async: true,
      percentage: 0,
    },
    {
      id: 3,
      title: `Step 3`,
      description: `This step is asynchronous.`,
      async: true,
      percentage: 0,
    },
  ];

  current = 0;
  processing = false;

  expenseTypes: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  litigationId!: number;
  private typedSearchTerm$ = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private reportService: JudicialReportService,
    private activatedRoute: ActivatedRoute
  ) {
    this.litigationId = Number(
      this.activatedRoute.snapshot.paramMap.get('litigationId')
    );
    this.judicialReportForm = this.formBuilder.group({
      courtAddress: [null, [Validators.required]],
      judicialFee: [null, [Validators.required]],
      judicialAppointmentDate: [null, [Validators.required]],
      adjournmentReason: [null, [Validators.required]],
      nextAppointments: this.formBuilder.array([]),
      expenseDetails: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.onGetExpenses(this.pageNumber, this.pageSize);
  }

  submitReport = () => {};

  get nextAppointments() {
    return this.judicialReportForm.controls['nextAppointments'] as FormArray;
  }

  deleteAdjournment(adjournmentIndex: number) {
    this.nextAppointments.removeAt(adjournmentIndex);
  }

  onAddNextAppointments() {
    const nextAppointmentForm = this.formBuilder.group({
      date: ['', Validators.required],
      reason: ['', Validators.required],
    });

    this.nextAppointments.push(nextAppointmentForm);
  }

  get expenseDetails() {
    return this.judicialReportForm.get('expenseDetails') as FormArray;
  }

  addExpenseDetails() {
    const expenseDetailForm = this.formBuilder.group({
      amount: ['', Validators.required],
      expense: ['', Validators.required],
    });

    this.expenseDetails.push(expenseDetailForm);
  }

  deleteExpense(expenseIndex: number) {
    this.expenseDetails.removeAt(expenseIndex);
  }

  resetField = (fieldName: String) => {
    this.judicialReportForm.get(`${fieldName}`)?.setValue('');
  };

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.loadingAndStep();
  }

  done(): void {
    this.reportService
      .createReport(this.litigationId, this.judicialReportForm?.value)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  loadingAndStep(): void {
    // if (this.current < this.steps.length) {
    //   const step = this.steps[this.current];
    //   if (step.async) {
    //     this.processing = true;
    //     // this.mockAsyncStep()
    //       .pipe(
    //         finalize(() => {
    //           step.percentage = 0;
    //           this.processing = false;
    this.current += 1;
    //         })
    //       )
    //       .subscribe((p) => {
    //         step.percentage = p;
    //       });
    //   } else {
    //     this.current += 1;
    //   }
    // }
  }

  // mockAsyncStep = (): Observable<number> => {
  //   const subStep1 = timer(600).pipe(map(() => 25));
  //   const subStep2 = subStep1.pipe(delay(600));
  //   const subStep3 = subStep2.pipe(delay(600));
  //   const subStep4 = subStep3.pipe(delay(600));
  //   return merge(subStep1, subStep2, subStep3, subStep4).pipe(
  //     scan((a, b) => a + b)
  //   );
  // };

  onSearch = (value: any) => {
    this.typedSearchTerm$.next(value);
  };

  onGetExpenses = (pageNumber?: number, pageSize?: number) => {
    this.expenseService
      .getExpenses(pageNumber, pageSize)
      .subscribe((res: any) => {
        this.expenseTypes = res?._embedded?.expenseDtoes;
      });
  };
}
