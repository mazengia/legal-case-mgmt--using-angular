import {Component, OnInit} from '@angular/core';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {AdvocateService} from "../../services/advocate/advocate.service";
import {Advocate} from "../../models/advocate";
import {CreateUpdateAdvocateComponent} from "./create-update-advocate/create-update-advocate.component";

@Component({
  selector: 'app-advocate',
  templateUrl: './advocate.component.html',
  styleUrls: ['./advocate.component.scss']
})
export class AdvocateComponent implements OnInit {
  constructor(
    private advocateService: AdvocateService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  loading!: boolean;
  advocate: Advocate[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.onGetAdvocate();
  }

  onGetAdvocate = () => {
    this.loading = true;
    this.advocateService
      .getAdvocate(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.advocate = res?._embedded?.advocateDtoes;
            console.log(this.advocate);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };
  onOpenAdvocateDetails = (id: any) => {
    this.route.navigate(['/advocate-details/', id]);
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
    const drawerRef = this.drawerService.create<CreateUpdateAdvocateComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Advocate `,
      nzWidth:600,
      nzContent: CreateUpdateAdvocateComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.onGetAdvocate()
    })
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
