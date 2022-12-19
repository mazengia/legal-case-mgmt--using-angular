import {Component, OnInit} from '@angular/core';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {MortgageDetailService} from "../../../../../../services/mortgage-type/mortgage-detail.service";
import {MortgageDetail} from "../../../../../../models/mortgage-detail";
import {
  CreateUpdateMortageDetailComponent
} from "./create-update-mortage-detail/create-update-mortage-detail.component";

@Component({
  selector: 'app-mortage-detail',
  templateUrl: './mortage-detail.component.html',
  styleUrls: ['./mortage-detail.component.scss']
})
export class MortageDetailComponent implements OnInit {
  constructor(
    private mortgageDetailService: MortgageDetailService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  totalElements = 0;
  loading!: boolean;
  mortgageDetails: MortgageDetail[] = [];
  pageIndex: number =1 ;
  pageSize: number = 10;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.getMortgageDetail();
  }

  getMortgageDetail (reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.mortgageDetailService
      .getMortgageDetail(this.pageIndex - 1, this.pageSize)
      .subscribe(
        (res) => {
        //   console.log("res")
        //   console.log(res)
        //   console.log("res")
          this.loading = false;
          this.mortgageDetails = res?._embedded?.mortgageDetailDtoes;
          this.totalElements = res.page.totalElements;
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };


  onOpenMortgageDetailDetails = (id: any) => {
    this.route.navigate(['/mortgage-detail-details/', id]);
  };

  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateMortageDetailComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} MortgageDetail `,
      nzWidth:900,
      nzContent: CreateUpdateMortageDetailComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getMortgageDetail()
    })
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}
