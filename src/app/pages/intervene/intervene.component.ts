import {Component, OnInit} from '@angular/core'
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {Intervene} from "../../models/intervene";
import {InterveneService} from "../../services/interevene/intervene.service";
import {CreateUpdateInterveneComponent} from "./create-update-intervene/create-update-intervene.component";

@Component({
  selector: 'app-intervene',
  templateUrl: './intervene.component.html',
  styleUrls: ['./intervene.component.scss']
})
export class InterveneComponent implements OnInit {
  constructor(
    private interveneService: InterveneService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private route: Router
  ) {}

  loading!: boolean;
  intervene: Intervene[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.getIntervene();
  }

  getIntervene = () => {
    this.loading = true;
    this.interveneService
      .getIntervene(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.intervene = res?._embedded?.interveneDtoes;
            console.log(this.intervene);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };


  onOpenInterveneDetails = (id: any) => {
    this.route.navigate(['/intervene-details/', id]);
  };
  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateInterveneComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Intervene `,
      nzWidth:600,
      nzContent: CreateUpdateInterveneComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getIntervene()
    })
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

}

