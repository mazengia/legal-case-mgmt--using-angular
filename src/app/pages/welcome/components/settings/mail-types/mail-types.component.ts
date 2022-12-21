import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MailNotificationTypeService} from 'src/app/services/mail-notification-type/mail-notification-type.service';
import {
  CreateUpdateExpenseDetailComponent
} from "../expense/expense-detail/create-update-expense-detail/create-update-expense-detail.component";
import {CreateMailTypesComponent} from "./create-mail-types/create-mail-types.component";
import {NzDrawerService} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-mail-types',
  templateUrl: './mail-types.component.html',
  styleUrls: ['./mail-types.component.scss'],
})
export class MailTypesComponent implements OnInit {
  constructor(
    private mailNotificationTypeService: MailNotificationTypeService,
    private drawerService: NzDrawerService,
    private route: Router
  ) {}

  loading!: boolean;
  mailTypes: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.getMailTypes();
  }

  getMailTypes = () => {
    this.loading = true;
    this.mailNotificationTypeService
      .getMailNotificationTypes(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.mailTypes = res?._embedded?.mailNotificationTypeDtoes;
            console.log(this.mailTypes);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };
  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateMailTypesComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} MailTypes `,
      nzWidth:600,
      nzContent: CreateMailTypesComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getMailTypes()
    })
  }



}
