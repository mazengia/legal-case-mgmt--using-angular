import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {finalize, first} from 'rxjs';
import {BranchService} from 'src/app/services/branch/branch.service';
import {CaseTypeService} from 'src/app/services/case-type/case-type.service';
import {CustomerService} from 'src/app/services/customer/customer.service';
import {LitigationService} from 'src/app/services/litigation/litigation.service';
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {CaseType} from "../../../../../../models/case-type";
import {InterveneService} from "../../../../../../services/interevene/intervene.service";
import {AdvocateService} from "../../../../../../services/advocate/advocate.service";
import {Advocate} from "../../../../../../models/advocate";
import {Intervene} from "../../../../../../models/intervene";
import {Employee} from "../../../../../../models/employee";
import {Branch} from "../../../../../../models/branch";
import {EmployeeService} from "../../../../../../services/employee/employee.service";
import {CommentsService} from "../../../../../../services/comments/comments.service";
import {AuthService} from "../../../../../../services/auth/auth.service";

@Component({
  selector: 'app-create-litigation',
  templateUrl: './create-litigation.component.html',
  styleUrls: ['./create-litigation.component.scss'],
})
export class CreateLitigationComponent implements OnInit {
  litigation: any;
  litigationForm!: FormGroup;
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
  accessRoles: any;

  constructor(
    private formBuilder: FormBuilder,
    private caseTypeService: CaseTypeService,
    private interveneService: InterveneService,
    private advocateService: AdvocateService,
    private branchService: BranchService,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private litigationService: LitigationService,
    private commentsService: CommentsService,
    private notificationService: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    if (this.hasMakerPriVillage()) {
      this.litigationForm = this.formBuilder.group({
        litigationType: [null, Validators.required],
        branch: this.formBuilder.group({
          id: [null, [Validators.required]],
        }),
        caseType: this.formBuilder.group({
          caseTypeId: [null, [Validators.required]],
        }),
        plaintiff: this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
          lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
          middleName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
          accountNumber: ['', [Validators.required, Validators.maxLength(16),
            Validators.minLength(16), Validators.pattern('^([0-9]{16})$')]],
          phoneNumber: ['', [Validators.required, Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern('^([0]{1}[9]{1}[0-9]{8})$')]],
        }),
        defendant: this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
          lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
          middleName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
          accountNumber: ['', [Validators.required, Validators.maxLength(16),
            Validators.minLength(16), Validators.pattern('^([0-9]{16})$')]],
          phoneNumber: ['', [Validators.required, Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern('^([0]{1}[9]{1}[0-9]{8})$')]],
        }),
        // courtAdjudicating: [null, [Validators.required]],
        // isBankPlaintiff: [''],
        content: [null, [Validators.required]],
        fileNumber: [null, [Validators.required]],
        // caseStage: [null, [Validators.required]],
        // attorneyHandlingTheCase: [null, [Validators.required]],
        // caseType: this.formBuilder.group({
        //   caseTypeId: [null, [Validators.required]],
        // }),
        // advocate: this.formBuilder.group({
        //   advocateId: [null, [Validators.required]],
        // }),
        // intervene: this.formBuilder.group({
        //   interveneId: [null, [Validators.required]],
        // })
        // status: [null, [Validators.required]],
      });
    }
    if (this.hasApprovePriVillage()) {
      this.litigationForm = this.formBuilder.group({
        content: [null, [Validators.required]],
        status: [null, [Validators.required]],
        branch: this.formBuilder.group({
          id: [null, [Validators.required]],
        })
      });
    }
    if (this.hasSupervisorPriVillage()) {
      this.litigationForm = this.formBuilder.group({
        branch: this.formBuilder.group({
          id: [null, [Validators.required]],
        }),
        advocate: this.formBuilder.group({
          advocateId: [null, [Validators.required]],
        }),
        intervene: this.formBuilder.group({
          interveneId: [null, [Validators.required]],
        }),
        content: [null, [Validators.required]],
        attorneyHandlingTheCase: [null, [Validators.required]]
      });
    }

    if (this.hasAttorneyPriVillage()) {
      this.litigationForm = this.formBuilder.group({
        branch: this.formBuilder.group({
          id: [null, [Validators.required]],
        }),
        courtAdjudicating: [null, [Validators.required]],
        content: [null, [Validators.required]],
        caseStage: [null, [Validators.required]]
      });
    }
  }

  ngOnInit(): void {
    if (this.hasMakerPriVillage()) {
      this.ongGetCaseTypes();
    }
    if (this.hasSupervisorPriVillage()) {
      this.ongGetAdvocate();
      this.ongGetIntervene();
    }
    if (this.hasApprovePriVillage()) {
    }
    this.getBranches();
    this.getEmployees();
    this.isAddMode = !this.value;
    if (this.value) {
      this.getLitigationById();
    }
  }

  getLitigationById() {
    this.litigationService
      .getLitigationById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.litigationForm.patchValue(res);
        }
      });
  }

  hasApprovePriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-approve")) {
      return true;
    }
    return false;
  }

  hasSupervisorPriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-supervisor")) {
      return true;
    }
    return false;
  }

  hasAttorneyPriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-attorney")) {
      return true;
    }
    return false;
  }

  hasMakerPriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-maker")) {
      return true;
    }
    return false;
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
          let comments = {
            content: this.litigationForm.controls['content'].value,
            litigation: {litigationId: data.litigationId}
          }
          // @ts-ignore
          this.commentsService.createComment(comments).subscribe(
            (data) => {
              console.log(data)
            },
            (error) => {
              console.log(error)
            }
          );
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
          let comments = {
            content: this.litigationForm.controls['content'].value,
            litigation: {litigationId: data.litigationId}
          }
          // @ts-ignore
          this.commentsService.createComment(comments).subscribe(
            (data) => {
              console.log(data)
            },
            (error) => {
              console.log(error)
            }
          );
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
      this.attorneyHandlingTheCase = res?._embedded.employeeDTOes;
    });
  };
}
