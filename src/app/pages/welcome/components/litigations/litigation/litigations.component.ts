import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LitigationService } from 'src/app/pages/services/litigation/litigation.service';

@Component({
  selector: 'app-litigations',
  templateUrl: './litigations.component.html',
  styleUrls: ['./litigations.component.scss'],
})
export class LitigationsComponent implements OnInit {
  constructor(
    private litigationService: LitigationService,
    private route: Router
  ) {}

  loading!: boolean;
  litigations: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  backgroundColor!: string;

  showSearch: boolean = false;
  buttonName: any = 'Toggle Search';
  inputValue: any;

  ngOnInit(): void {
    this.onGetlitigations();
  }

  onGetlitigations = () => {
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
    this.route.navigate(['/home/create-litigation']);
  };

  onUpdateLitigation = (litigationId: number) => {
    console.log(litigationId);
    this.route.navigate(['/home/update-litigation/', litigationId]);
  };

  onOpenLitigationDetails = (litigationId: number) => {
    this.route.navigate(['/home/litigation-details/', litigationId]);
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
}
