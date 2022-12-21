import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Appointment} from "../../../../models/appointment";
import {Litigation} from "../../../../models/litigation";
import {Expense} from "../../../../models/expense";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {LitigationService} from "../../../../services/litigation/litigation.service";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs";
import {AppealService} from "../../../../services/appeal/appeal.service";

@Component({
  selector: 'app-create-update-appeal',
  templateUrl: './create-update-appeal.component.html',
  styleUrls: ['./create-update-appeal.component.scss']
})
export class CreateUpdateAppealComponent implements OnInit {

  appealForm!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  submitted = false;
  appointment?: Appointment[] | undefined;
  litigation?:Litigation[] |undefined;
  expense?: Expense[] | undefined;
  @Input() value?: number;
  @Input() caseStage?: any
  isAddMode = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private appealService: AppealService,
    private litigationService1: LitigationService,
    private notificationService: NzNotificationService,
    private litigationService:LitigationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.appealForm = this.formBuilder.group({
      litigation: this.formBuilder.group({
        litigationId: [null, [Validators.required]],
      }),
      reason: [null, [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.getLitigationByCaseStage();
    this.isAddMode = !this.value;
    if (this.value) {
      this.getAppealById();
    }
    if(this.caseStage ){
      this.addAppealFromLitigation();
    }
  }

  getAppealById() {
    this.appealService
      .getAppealById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.appealForm.controls['litigation'].patchValue(res.judicialAppointment?.litigation)
          this.appealForm.patchValue(res);
        }
      });
  }

  addAppealFromLitigation() {
    console.log("caseStage",this.caseStage)
    this.litigationService
      .getLitigationByCaseStage(this.caseStage)
      .pipe(first())
      .subscribe( res  => {

        const litigation={ // @ts-ignore
                litigationId:res._embedded.litigationDtoes?.litigationId,// @ts-ignore
                litigationType:res._embedded.litigationDtoes?.litigationType,// @ts-ignore
                caseType:res._embedded.litigationDtoes?.caseType?.caseTypeName
        }
        console.log("lit",res)
        console.log("lit",litigation)// @ts-ignore
          this.appealForm.controls['litigation'].patchValue(res._embedded?.litigationDtoes[0])


      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.appealForm.invalid) {
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
    for (const key in this.appealForm.controls) {
      if (this.appealForm.controls.hasOwnProperty(key)) {
        this.appealForm.controls[key].markAsDirty();
        this.appealForm.controls[key].updateValueAndValidity();
      }
    }
// console.log("mor detil")
//     console.log(this.mortageDetailForm.value)
    this.appealService.createAppeal(this.appealForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'appeal   ',
            'appeal  Successfully Created'
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

    for (const key in this.appealForm.controls) {
      if (this.appealForm.controls.hasOwnProperty(key)) {
        this.appealForm.controls[key].markAsDirty();
        this.appealForm.controls[key].updateValueAndValidity();
      }
    }
    this.appealService
      .updateAppeal(this.value, this.appealForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'appeal ',
            'appeal Successfully Updated'
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
  getLitigationByCaseStage = (caseStage="POST_TRIAL") => {
    this.litigationService
      .getLitigationByCaseStage(caseStage)
      .subscribe((res) => {
        console.log("appe=",res)
        this.litigation = res?._embedded.litigationDtoes;
      });
  };

}

