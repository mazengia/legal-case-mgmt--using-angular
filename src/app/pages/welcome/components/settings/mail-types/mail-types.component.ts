import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { MailNotificationTypeService } from 'src/app/pages/services/mail-notification-type/mail-notification-type.service';

@Component({
  selector: 'app-mail-types',
  templateUrl: './mail-types.component.html',
  styleUrls: ['./mail-types.component.scss'],
})
export class MailTypesComponent implements OnInit {
  constructor(
    private mailNotificationTypeService: MailNotificationTypeService,
    private route: Router
  ) {}

  loading!: boolean;
  mailTypes: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  backgroundColor!: string;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.onGetCaseTypes();
  }

  onGetCaseTypes = () => {
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

  onCreateMailNotificationType = () => {
    this.route.navigate(['/home/create-mail-type']);
  };

  onUpdateMailNotificationType = (mailNotificationTypeId: number) => {
    console.log(mailNotificationTypeId);
    this.route.navigate(['/home/update-mail-type/', mailNotificationTypeId]);
  };

  onShowHideSearch = () => {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.buttonName = 'Hide Search';
    } else {
      this.buttonName = 'Toggel Search';
    }

    console.log(this.showSearch, this.buttonName);
  };
}
