import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LitigationService} from 'src/app/services/litigation/litigation.service';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CreateLitigationComponent} from "./create-litigation/create-litigation.component";
import {Litigation} from "../../../../../models/litigation";
import {CreateUpdateAppealComponent} from "../../../appeal/create-update-appeal/create-update-appeal.component";
import {AuthService} from "../../../../../services/auth/auth.service";
import {EmployeeService} from "../../../../../services/employee/employee.service";

@Component({
  selector: 'app-litigations',
  templateUrl: './litigations.component.html',
  styleUrls: ['./litigations.component.scss'],
})
export class LitigationsComponent implements OnInit {
  constructor(
    private litigationService: LitigationService,
    private drawerService: NzDrawerService,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private notification: NzNotificationService,
    private route: Router
  ) {
  }

  accessRoles: any;
  loading!: boolean;
  litigation: Litigation[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  employeeId = this.authService.getEmployeeId();

  ngOnInit(): void {
    if (this.hasSupervisorPriVillage()) {
      this.findLitigationByStatus();
    }
    if (this.hasMakerPriVillage()) {
      this.employeeService.getEmployeeByEmployeeId(this.employeeId)
        .subscribe((data: any) => {
          this.getLitigationByBranchId(data.branch.id);
        });
    }
    if (this.hasAttorneyPriVillage()) {
      this.findLitigationByAttorneyHandlingTheCase();
    }
    if (this.hasApprovePriVillage()) {
      this.onGetLitigation();
    }

  }

  onGetLitigation = () => {
    this.loading = true;
    this.litigationService
      .getLitigations(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.litigation = res?._embedded?.litigationDtoes;
            console.log(this.litigation);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };
  getLitigationByBranchId = (brnchId: any) => {
    this.loading = true;
    this.litigationService
      .getLitigationByBranchId(this.pageIndex, this.pageSize, brnchId)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.litigation = res?._embedded?.litigationDtoes;
            console.log(this.litigation);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };
  findLitigationByAttorneyHandlingTheCase = () => {
    this.loading = true;
    this.litigationService
      .findLitigationByAttorneyHandlingTheCase(this.pageIndex, this.pageSize, this.employeeId)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.litigation = res?._embedded?.litigationDtoes;
            console.log(this.litigation);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };
  findLitigationByStatus = () => {
    this.loading = true;
    this.litigationService
      .findLitigationByStatus(this.pageIndex, this.pageSize,status="Approved" )
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.litigation = res?._embedded?.litigationDtoes;
            console.log(this.litigation);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };

  onOpenLitigationDetails(litigationId: any) {
    this.route.navigate(['/litigation-details/', litigationId]);
  };

  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateLitigationComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Litigation `,
      nzWidth: 900,
      nzContent: CreateLitigationComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      if (this.hasApprovePriVillage()) {
        this.onGetLitigation();
      }
      if (this.hasSupervisorPriVillage()) {
        this.findLitigationByStatus();
      }
      if (this.hasMakerPriVillage()) {
        this.employeeService.getEmployeeByEmployeeId(this.employeeId)
          .subscribe((data: any) => {
            this.getLitigationByBranchId(data.branch.id);
          });
      }
      if(this.hasAttorneyPriVillage()){
        this.findLitigationByAttorneyHandlingTheCase();
      }
    })
  }

  hasMakerPriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-maker")) {
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

  openAppealDrawer(caseStage: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateAppealComponent,
      { litigationId: number }>({
      nzTitle: `${caseStage ? 'Update' : 'Create'} Appeal `,
      nzWidth: 600,
      nzContent: CreateUpdateAppealComponent,
      nzContentParams: {
        caseStage: caseStage
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      if (this.hasMakerPriVillage()) {
        this.employeeService.getEmployeeByEmployeeId(this.employeeId)
          .subscribe((data: any) => {
            this.getLitigationByBranchId(data.branch.id);
          });
      }
      if (this.hasApprovePriVillage()) {
        this.onGetLitigation();
      }
      else {
        this.onGetLitigation()
      }
    })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
