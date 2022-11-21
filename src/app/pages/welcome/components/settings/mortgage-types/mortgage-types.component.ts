import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MortgageTypeService } from 'src/app/pages/services/mortgage-type/mortgage-type.service';

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
  pageIndex: number = 0;
  pageSize: number = 10;

  ngOnInit(): void {
    this.onGetCaseTypes();
  }

  onGetCaseTypes = () => {
    this.loading = true;
    this.mortgageTypeService
      .getMortgageTypes(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.mortgageTypes = res?._embedded?.mortgageTypeDtoes;
            console.log(this.mortgageTypes);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };

  onCreateMortgageType = () => {
    this.route.navigate(['/home/create-mortgage-type']);
  };

  onUpdateMortgageType = (mortgageTypeId: number) => {
    console.log(mortgageTypeId);
    this.route.navigate(['/home/update-mortgage-type/', mortgageTypeId]);
  };
}
