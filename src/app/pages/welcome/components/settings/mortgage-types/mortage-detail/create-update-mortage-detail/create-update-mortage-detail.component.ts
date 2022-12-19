import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs";
import {MortgageTypeService} from "../../../../../../../services/mortgage-type/mortgage-type.service";
import {MortgageDetailService} from "../../../../../../../services/mortgage-type/mortgage-detail.service";
import {MortgageType} from "../../../../../../../models/mortgage-type";
import {MortgageDetail} from "../../../../../../../models/mortgage-detail";

@Component({
  selector: 'app-create-update-mortage-detail',
  templateUrl: './create-update-mortage-detail.component.html',
  styleUrls: ['./create-update-mortage-detail.component.scss']
})
export class CreateUpdateMortageDetailComponent implements OnInit {

  mortageDetailForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  submitted = false;
  mortgageType?: MortgageType[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;
  isCollateralEstimated = false;
  isWrittenLegalNoticeServed=false;
  constructor(
    private formBuilder: FormBuilder,
    private mortgageTypeService: MortgageTypeService,
    private mortgageDetailService: MortgageDetailService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.mortageDetailForm = this.formBuilder.group({
      mortgageType: this.formBuilder.group({
        mortgageTypeId: [null, [Validators.required]],
      }),
      isWrittenLegalNoticeServed: [null, [Validators.required]],
      dateLegalNoticeServed: [],
      plateNumber: [null, [Validators.required]],
      shansiNumber: [null, [Validators.required]],
      motorNumber: [null, [Validators.required]],
      machineryType: [null, [Validators.required]],
      numberOfTitleIndeed: [null, [Validators.required]],
      dateCollateralRegistered: [null, [Validators.required]],
      isCollateralEstimated: [null, [Validators.required]],
      dateCollateralIsEstimated: [],
      mortgagor: [null, [Validators.required]],
      borrower: [null, [Validators.required]],
      remark: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getMortgageType();
    this.isAddMode = !this.value;
    if (this.value) {
      this.getAppointmentById();
    }
  }

  getAppointmentById() {
    this.mortgageDetailService
      .getMortgageDetailById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.mortageDetailForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.mortageDetailForm.invalid) {
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
    for (const key in this.mortageDetailForm.controls) {
      if (this.mortageDetailForm.controls.hasOwnProperty(key)) {
        this.mortageDetailForm.controls[key].markAsDirty();
        this.mortageDetailForm.controls[key].updateValueAndValidity();
      }
    }
    if(!this.isCollateralEstimated ){
      this.mortageDetailForm.controls['dateCollateralIsEstimated'].patchValue("")
     }
    if(!this.isWrittenLegalNoticeServed){
      this.mortageDetailForm.controls['dateLegalNoticeServed'].patchValue("")
    }
    console.log(this.mortageDetailForm.value)
    // this.mortgageDetailService.createMortgageDetail(this.mortageDetailForm.value)
    //   .pipe(finalize(() => {
    //     this.drawerRef.close()
    //   }))
    //   .subscribe(
    //     (data) => {
    //       this.createNotification(
    //         'success',
    //         'MortgageDetail  ',
    //         'MortgageDetail  Successfully Created'
    //       );
    //     },
    //     (error) => {
    //       console.log('error = ', error)
    //       this.createNotification(
    //         'error',
    //         'Error',
    //         error.apierror.debugMessage);
    //     }
    //   );
  }

  updateMortgageDetail(): void {

    for (const key in this.mortageDetailForm.controls) {
      if (this.mortageDetailForm.controls.hasOwnProperty(key)) {
        this.mortageDetailForm.controls[key].markAsDirty();
        this.mortageDetailForm.controls[key].updateValueAndValidity();
      }
    }
    this.mortgageDetailService
      .updateMortgageDetail(this.value, this.mortageDetailForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'MortgageDetail',
            'MortgageDetail Successfully Updated'
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

  getMortgageType = (pageNumber?: number, pageSize?: number) => {
    this.mortgageTypeService
      .getMortgageTypes(pageNumber, pageSize)
      .subscribe((res) => {
        this.mortgageType = res?._embedded.mortgageTypeDtoes;
      });
  };

  collateralEstimated = (estimated:any) => {
   this.isCollateralEstimated=estimated;
  };
  writtenLegalNoticeServed= (legalNoticeServed:any) => {
    this.isWrittenLegalNoticeServed=legalNoticeServed;
  };
}
