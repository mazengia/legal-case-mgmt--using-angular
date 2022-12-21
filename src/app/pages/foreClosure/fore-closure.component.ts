import {Component, OnInit} from '@angular/core';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {ForeClosureService} from "../../services/foreClosure/advocate.service";
import {CreateUpdateForeClosureComponent} from "./create-update-fore-closure/create-update-fore-closure.component";

@Component({
  selector: 'app-fore-closure',
  templateUrl: './fore-closure.component.html',
  styleUrls: ['./fore-closure.component.scss']
})
export class ForeClosureComponent implements OnInit {
  constructor(
    private foreClosureService: ForeClosureService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  loading!: boolean;
  foreClosures: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.getForeClosure();
  }

  getForeClosure = () => {
    this.loading = true;
    this.foreClosureService
      .getForeAllClosure(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.foreClosures = res?._embedded?.foreClosureDtoes;
            console.log(this.foreClosures);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };

  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateForeClosureComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} ForeClosure `,
      nzWidth:600,
      nzContent: CreateUpdateForeClosureComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getForeClosure()
    })
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  foreClosureDetails (id: any)  {
    this.route.navigate(['/fore-closure-details/', id]).then(r => {});
  };
}
