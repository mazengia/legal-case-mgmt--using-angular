import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime, Subject } from 'rxjs';
import { BranchService } from 'src/app/pages/services/branch/branch.service';
import { CaseTypeService } from 'src/app/pages/services/case-type/case-type.service';
import { CustomerService } from 'src/app/pages/services/customer/customer.service';
import { LitigationService } from 'src/app/pages/services/litigation/litigation.service';

@Component({
  selector: 'app-create-litigation',
  templateUrl: './create-litigation.component.html',
  styleUrls: ['./create-litigation.component.scss'],
})
export class CreateLitigationComponent implements OnInit {
  litigation: any;
  isCreateMode!: boolean;
  litigationForm!: FormGroup;
  caseTypes: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  branches: any[] = [];
  customerData: any;
  accountNumber!: string;

  plaintiff = {
    firstName: 'ENAT BANK',
    middleName: '---',
    lastName: '---',
    accountNumber: '---',
    phoneNumber: '+251 115 504948',
  };

  private typedSearchTerm$ = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private caseTypeService: CaseTypeService,
    private branchService: BranchService,
    private customerService: CustomerService,
    private litigationService: LitigationService,
    private notificationService: NzNotificationService
  ) {
    this.litigationForm = this.formBuilder.group({
      branch: {
        id: [null, [Validators.required]],
      },
      plaintiff: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: ['', [Validators.required]],
        accountNumber: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
      }),

      defendant: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: ['', [Validators.required]],
        accountNumber: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
      }),

      courtAdjudicating: [null, [Validators.required]],
      isBankPlaintiff: [true, [Validators.required]],
      caseType: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ongGetCaseTypes();
    this.getBranches();
    this.litigationForm.get('plaintiff')?.patchValue(this.plaintiff);

    this.typedSearchTerm$.pipe(debounceTime(1000)).subscribe((searchTerm) => {
      this.onGetCustomerByAccountNumber(searchTerm);
    });
  }

  ongGetCaseTypes = (pageNumber?: number, pageSize?: number) => {
    this.caseTypeService
      .getCaseTypes(pageNumber, pageSize)
      .subscribe((res: any) => {
        this.caseTypes = res?._embedded.caseTypeDtoes;
      });
  };

  submitLitigation = () => {
    this.onCreateLitigation();
  };

  onCreateLitigation = () => {
    this.litigationService
      .createLitigation(this.litigationForm?.value)
      .subscribe((res: any) => {
        this.notificationService.create(
          'error',
          'Create Litigation',
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
        );
      });
  };

  onUpdateLitigation = () => {};

  resetField = (fieldName: String) => {
    this.litigationForm.get(`${fieldName}`)?.setValue('');
  };

  getBranches = () => {
    this.branchService.getBranches().subscribe((res: any) => {
      this.branches = res?._embedded.branchDtoes;
    });
  };

  setBankInfo = (plaintiffVal: boolean) => {
    console.log(plaintiffVal);

    if (plaintiffVal === false) {
      this.litigationForm.get('plaintiff')?.patchValue(this.customerData);
      this.litigationForm.get('defendant')?.patchValue(this.plaintiff);
    } else {
      this.litigationForm.get('plaintiff')?.patchValue(this.plaintiff);
      this.litigationForm.get('defendant')?.patchValue(this.customerData);
    }
  };

  search = (event: any) => {};

  onGetCustomerByAccountNumber = (accountNumber: any) => {
    this.customerService
      .finCustomerDetailsByAccountNumber(accountNumber)
      .subscribe((res: any) => {
        this.customerData = res;
        console.log(res);
        this.litigationForm.get('defendant')?.patchValue(this.customerData);
      });
  };

  onSearch = (value: any) => {
    this.typedSearchTerm$.next(value);
  };
}
