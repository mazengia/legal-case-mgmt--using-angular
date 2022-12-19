import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CaseType} from "../../../models/case-type";
import {Advocate} from "../../../models/advocate";
import {Intervene} from "../../../models/intervene";
import {finalize, first} from "rxjs";
import {Employee} from "../../../models/employee";
import {Branch} from "../../../models/branch";
import {InterveneService} from "../../../services/interevene/intervene.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-create-update-intervene',
  templateUrl: './create-update-intervene.component.html',
  styleUrls: ['./create-update-intervene.component.scss']
})
export class CreateUpdateInterveneComponent implements OnInit {
  litigation: any;
  formGroup!: FormGroup;
  pageNumber: number = 0;
  pageSize: number = 10;
  accountNumber!: string;
  submitted = false;
  isBankPlaintiff = false;
  caseType?: CaseType[] | undefined;
  advocate?: Advocate[] | undefined;
  intervene?: Intervene[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;
  attorneyHandlingTheCase?: Employee[];
  branch?: Branch[];

  constructor(
    private formBuilder: FormBuilder,
    private interveneService: InterveneService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.formGroup = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      interveneAddress: this.formBuilder.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        subCity: ['', [Validators.required]],
        woredaOrKebele: ['', [Validators.required]],
        houseNo: ['', [Validators.required]],
      }),
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.getInterveneById();
    }
  }

  getInterveneById() {
    this.interveneService
      .getInterveneById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.formGroup.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createIntervene();
    } else {
      this.updateIntervene();
    }
  }

  createIntervene(): void {
    for (const key in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(key)) {
        this.formGroup.controls[key].markAsDirty();
        this.formGroup.controls[key].updateValueAndValidity();
      }
    }

    this.interveneService.createIntervene(this.formGroup.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Intervene  ',
            'Intervene  Successfully Created'
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

  updateIntervene(): void {

    for (const key in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(key)) {
        this.formGroup.controls[key].markAsDirty();
        this.formGroup.controls[key].updateValueAndValidity();
      }
    }
    this.interveneService
      .updateIntervene(this.value, this.formGroup.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Intervene',
            'Intervene Successfully Updated'
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

  search = (event: any) => {
  };
}
