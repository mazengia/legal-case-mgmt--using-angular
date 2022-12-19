import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MortgageTypeService} from 'src/app/services/mortgage-type/mortgage-type.service';

@Component({
  selector: 'app-mortgage-types',
  templateUrl: './mortgage-types.component.html',
  styleUrls: ['./mortgage-types.component.scss'],
})
export class MortgageTypesComponent implements OnInit {
  constructor(
    private mortgageTypeService: MortgageTypeService,
    private route: Router
  ) {}

  loading!: boolean;
  mortgageTypes: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  totalElements = 0;

  ngOnInit(): void {
    this.onGetCaseTypes();
  }

  onGetCaseTypes (reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.mortgageTypeService
      .getMortgageTypes(this.pageIndex - 1, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.mortgageTypes = res?._embedded?.mortgageTypeDtoes;
            this.totalElements = res.page.totalElements;
            // console.log(this.mortgageTypes);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };

  onCreateMortgageType = () => {
    this.route.navigate(['/create-mortgage-type']);
  };

  onUpdateMortgageType = (mortgageTypeId: number) => {
    console.log(mortgageTypeId);
    this.route.navigate(['/update-mortgage-type/', mortgageTypeId]);
  };
}
