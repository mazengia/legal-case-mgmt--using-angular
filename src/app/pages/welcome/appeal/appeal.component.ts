import {Component, OnInit} from '@angular/core';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {CreateUpdateAppealComponent} from "./create-update-appeal/create-update-appeal.component";
import {AppealService} from "../../../services/appeal/appeal.service";
import {Appeal} from "../../../models/appeal";

@Component({
  selector: 'app-appeal',
  templateUrl: './appeal.component.html',
  styleUrls: ['./appeal.component.scss']
})
export class AppealComponent implements OnInit {
  constructor(
    private appealService: AppealService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  totalElements:any = 0;
  loading!: boolean;
  appeal: Appeal[] = [];
  pageIndex: number =1 ;
  pageSize: number = 10;
  inputValue: any;

  ngOnInit(): void {
    this.getAppeal();
  }

  getAppeal (reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.appealService
      .getAppeal(this.pageIndex - 1, this.pageSize)
      .subscribe(
        (res) => {
          this.loading = false;
          this.appeal = res?._embedded?.appealDtoes;
          this.totalElements = res?.page?.totalElements;
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };


  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateAppealComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Appeal `,
      nzWidth:600,
      nzContent: CreateUpdateAppealComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getAppeal()
    })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
