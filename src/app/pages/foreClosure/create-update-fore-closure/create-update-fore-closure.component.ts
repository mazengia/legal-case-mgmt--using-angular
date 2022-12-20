import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Intervene} from "../../../models/intervene";
import {finalize, first} from "rxjs";
import {Branch} from "../../../models/branch";
import {InterveneService} from "../../../services/interevene/intervene.service";
import {BranchService} from "../../../services/branch/branch.service";
import {EmployeeService} from "../../../services/employee/employee.service";
import {CustomerService} from "../../../services/customer/customer.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {AuctionTypeService} from "../../../services/auction-type/auction-type.service";
import {AuctionType} from "../../../models/auction-type";
import {MortgageDetailService} from "../../../services/mortgage-type/mortgage-detail.service";
import {MortgageDetail} from "../../../models/mortgage-detail";
import {ForeClosureService} from "../../../services/foreClosure/advocate.service";

@Component({
  selector: 'app-create-update-fore-closure',
  templateUrl: './create-update-fore-closure.component.html',
  styleUrls: ['./create-update-fore-closure.component.scss']
})
export class CreateUpdateForeClosureComponent implements OnInit {
  foreClosureForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  accountNumber!: string;
  submitted = false;
  isBankPlaintiff = false;
  auctionType?: AuctionType[] | undefined;
  mortgageDetail?: MortgageDetail[] | undefined;
  intervene?: Intervene[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;
  branch?: Branch[];

  constructor(
    private formBuilder: FormBuilder,
    private auctionTypeService: AuctionTypeService,
    private interveneService: InterveneService,
    private mortgageDetailService: MortgageDetailService,
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private foreClosureService: ForeClosureService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.foreClosureForm = this.formBuilder.group({
      // branch: this.formBuilder.group({
      //   id: [null, [Validators.required]],
      // }),

      mortgageDetail: this.formBuilder.group({
        mortgageDetailId: [null, [Validators.required]],
      }),
      // auctionType: this.formBuilder.group({
      //   auctionTypeId: [null, [Validators.required]],
      // }),
      remark: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAuctions();
    this.getBranches();
    this.getMortgageDetails();
    this.isAddMode = !this.value;
    if (this.value) {
      this.getForeclosureById();
    }
  }

  getForeclosureById() {
    this.foreClosureService
      .getForeClosureById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.foreClosureForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.foreClosureForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createForeClosure();
    } else {
      this.updateForeClosure();
    }
  }

  createForeClosure(): void {
    for (const key in this.foreClosureForm.controls) {
      if (this.foreClosureForm.controls.hasOwnProperty(key)) {
        this.foreClosureForm.controls[key].markAsDirty();
        this.foreClosureForm.controls[key].updateValueAndValidity();
      }
    }

    this.foreClosureService.createForeClosure(this.foreClosureForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'ForeClosure  ',
            'ForeClosure  Successfully Created'
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

  updateForeClosure(): void {

    for (const key in this.foreClosureForm.controls) {
      if (this.foreClosureForm.controls.hasOwnProperty(key)) {
        this.foreClosureForm.controls[key].markAsDirty();
        this.foreClosureForm.controls[key].updateValueAndValidity();
      }
    }
    this.foreClosureService
      .updateForeClosure(this.value, this.foreClosureForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Foreclosure',
            'Foreclosure Successfully Updated'
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

  getAuctions = (pageNumber?: number, pageSize?: number) => {
    this.auctionTypeService
      .getAuctionTypes(pageNumber, pageSize)
      .subscribe((res: any) => {
        this.auctionType = res?._embedded.auctionTypeDtoes;
      });
  };

  getMortgageDetails = (pageNumber?: number, pageSize?: number) => {
    this.mortgageDetailService
      .getMortgageDetail(pageNumber, pageSize)
      .subscribe((res) => {
        this.mortgageDetail = res?._embedded.mortgageDetailDtoes;
      });
  };

  getBranches = () => {
    this.branchService.getBranches().subscribe((res: any) => {
      this.branch = res?._embedded.branchDtoes;
    });
  };

}
