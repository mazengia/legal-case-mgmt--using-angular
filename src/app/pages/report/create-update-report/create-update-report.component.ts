import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CaseType} from "../../../models/case-type";
import {Advocate} from "../../../models/advocate";
import {Intervene} from "../../../models/intervene";
import {finalize, first, Subject} from "rxjs";
import {Employee} from "../../../models/employee";
import {Branch} from "../../../models/branch";
import {CaseTypeService} from "../../../services/case-type/case-type.service";
import {InterveneService} from "../../../services/interevene/intervene.service";
import {AdvocateService} from "../../../services/advocate/advocate.service";
import {BranchService} from "../../../services/branch/branch.service";
import {EmployeeService} from "../../../services/employee/employee.service";
import {CustomerService} from "../../../services/customer/customer.service";
import {LitigationService} from "../../../services/litigation/litigation.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-create-update-report',
  templateUrl: './create-update-report.component.html',
  styleUrls: ['./create-update-report.component.scss']
})
export class CreateUpdateReportComponent implements OnInit {
  litigation: any;
  litigationForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  customerData: any;
  accountNumber!: string;
  submitted = false;
  isBankPlaintiff = false;
  caseType?: CaseType[] | undefined;
  advocate?: Advocate[] | undefined;
  intervene?: Intervene[] | undefined;
  private typedSearchTerm$ = new Subject<any>();
  @Input() value?: number;
  isAddMode = true;
  loading = false;
  attorneyHandlingTheCase?: Employee[];
  branch?: Branch[];

  constructor(
    private formBuilder: FormBuilder,
    private caseTypeService: CaseTypeService,
    private interveneService: InterveneService,
    private advocateService: AdvocateService,
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private litigationService: LitigationService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.litigationForm = this.formBuilder.group({
      litigationType: [null, Validators.required],
      branch: this.formBuilder.group({
        id: [null, [Validators.required]],
      }),
      plaintiff: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        middleName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        accountNumber: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^([0]{1}[9]{1}[0-9]{8})$')]],
      }),
      defendant: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        middleName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        accountNumber: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^([0]{1}[9]{1}[0-9]{8})$')]],
      }),
      courtAdjudicating: [null, [Validators.required]],
      isBankPlaintiff: [''],
      remark: [null, [Validators.required]],
      fileNumber: [null, [Validators.required]],
      caseStage: [null, [Validators.required]],
      caseType: this.formBuilder.group({
        caseTypeId: [null, [Validators.required]],
      }),
      advocate: this.formBuilder.group({
        advocateId: [null, [Validators.required]],
      }),
      intervene: this.formBuilder.group({
        interveneId: [null, [Validators.required]],
      }),
      attorneyHandlingTheCase: this.formBuilder.group({
        employeeId: [null, [Validators.required]],
      })
    });
  }

  ngOnInit(): void {
    this.ongGetCaseTypes();
    this.getBranches();
    this.getEmployees();
    this.ongGetAdvocate();
    this.ongGetIntervene();
    this.isAddMode = !this.value;
    if (this.value) {
      this.getLitigationById();
    }
  }

  getLitigationById() {
    this.litigationService
      .getLitigation(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.litigationForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.litigationForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createLitigation();
    } else {
      this.updateLitigation();
    }
  }

  createLitigation(): void {
    for (const key in this.litigationForm.controls) {
      if (this.litigationForm.controls.hasOwnProperty(key)) {
        this.litigationForm.controls[key].markAsDirty();
        this.litigationForm.controls[key].updateValueAndValidity();
      }
    }

    this.litigationService.createLitigation(this.litigationForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Litigation  ',
            'Litigation  Successfully Created'
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

  updateLitigation(): void {

    for (const key in this.litigationForm.controls) {
      if (this.litigationForm.controls.hasOwnProperty(key)) {
        this.litigationForm.controls[key].markAsDirty();
        this.litigationForm.controls[key].updateValueAndValidity();
      }
    }
    this.litigationService
      .updateLitigation(this.value, this.litigationForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Litigation',
            'Litigation Successfully Updated'
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

  ongGetCaseTypes = (pageNumber?: number, pageSize?: number) => {
    this.caseTypeService
      .getCaseTypes(pageNumber, pageSize)
      .subscribe((res: any) => {
        this.caseType = res?._embedded.caseTypeDtoes;
      });
  };

  ongGetAdvocate = (pageNumber?: number, pageSize?: number) => {
    this.advocateService
      .getAdvocate(pageNumber, pageSize)
      .subscribe((res) => {
        this.advocate = res?._embedded.advocateDtoes;
      });
  };

  ongGetIntervene = (pageNumber?: number, pageSize?: number) => {
    this.interveneService
      .getIntervene(pageNumber, pageSize)
      .subscribe((res) => {
        this.intervene = res?._embedded.interveneDtoes;
      });
  };


  getBranches = () => {
    this.branchService.getBranches().subscribe((res: any) => {
      this.branch = res?._embedded.branchDtoes;
    });
  };
  getEmployees = () => {
    this.employeeService.getEmployee().subscribe((res: any) => {
      // console.log("res")
      // console.log(res)
      // console.log("res")
      this.attorneyHandlingTheCase = res?._embedded.employeeDTOes;
    });
  };


  search = (event: any) => {
  };

  onGetCustomerByAccountNumber = (accountNumber: any) => {
    this.customerService
      .finCustomerDetailsByAccountNumber(accountNumber)
      .subscribe((res: any) => {
        this.customerData = res;
        console.log(res);
        this.litigationForm.get('defendant')?.patchValue(this.customerData);
      });
  };
}
