import {Component, OnInit} from '@angular/core';
import {LitigationService} from "../../services/litigation/litigation.service";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {
  CreateLitigationComponent
} from "../welcome/components/litigations/litigation/create-litigation/create-litigation.component";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    private litigationService: LitigationService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  loading!: boolean;
  litigations: any[] = [];
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
            this.litigations = res?._embedded?.litigationDtoes;
            console.log(this.litigations);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };

  onCreateLitigation = () => {
    this.route.navigate(['/create-litigation']);
  };

  onUpdateLitigation = (litigationId: number) => {
    console.log(litigationId);
    this.route.navigate(['/update-litigation/', litigationId]);
  };

  onOpenLitigationDetails = (litigationId: number) => {
    this.route.navigate(['/litigation-details/', litigationId]);
  };
  onShowHideSearch = () => {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.buttonName = 'Hide Search';
    } else {
      this.buttonName = 'Toggle Search';
    }

    console.log(this.showSearch, this.buttonName);
  };
  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateLitigationComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Litigation `,
      nzWidth:600,
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
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
