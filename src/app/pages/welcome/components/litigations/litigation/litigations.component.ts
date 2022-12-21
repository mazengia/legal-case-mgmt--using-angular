import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LitigationService} from 'src/app/services/litigation/litigation.service';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CreateLitigationComponent} from "./create-litigation/create-litigation.component";
import {Litigation} from "../../../../../models/litigation";
import {CreateUpdateAppealComponent} from "../../../appeal/create-update-appeal/create-update-appeal.component";
import {AuthService} from "../../../../../services/auth/auth.service";

@Component({
  selector: 'app-litigations',
  templateUrl: './litigations.component.html',
  styleUrls: ['./litigations.component.scss'],
})
export class LitigationsComponent implements OnInit {
  constructor(
    private litigationService: LitigationService,
    private drawerService: NzDrawerService,
    private authService:AuthService,
    private notification: NzNotificationService,
    private route: Router
  ) {}
  accessRoles:any;
  loading!: boolean;
  litigation: Litigation[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.onGetLitigation();
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

  onOpenLitigationDetails (litigationId: any)  {
    this.route.navigate(['/litigation-details/', litigationId]);
  };
  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateLitigationComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Litigation `,
      nzWidth:900,
      nzContent: CreateLitigationComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.onGetLitigation()
    })
  }
  hasHrVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-approve")) {
      return true;
    }
    return false;
  }
  openAppealDrawer(caseStage:any): void {
    const drawerRef = this.drawerService.create<CreateUpdateAppealComponent,
      { litigationId: number }>({
      nzTitle: `${caseStage ? 'Update' : 'Create'} Appeal `,
      nzWidth:600,
      nzContent: CreateUpdateAppealComponent,
      nzContentParams: {
        caseStage: caseStage
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.onGetLitigation()
    })
  }


  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
