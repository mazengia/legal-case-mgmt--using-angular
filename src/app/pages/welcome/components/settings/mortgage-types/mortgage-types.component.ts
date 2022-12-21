import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MortgageTypeService} from 'src/app/services/mortgage-type/mortgage-type.service';
import {CreateCaseTypeComponent} from "../case-type/create-case-type/create-case-type.component";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {CreateMortgageTypeComponent} from "./create-mortgage-type/create-mortgage-type.component";
import {MortgageType} from "../../../../../models/mortgage-type";

@Component({
  selector: 'app-mortgage-types',
  templateUrl: './mortgage-types.component.html',
  styleUrls: ['./mortgage-types.component.scss'],
})
export class MortgageTypesComponent implements OnInit {
  constructor(
    private mortgageTypeService: MortgageTypeService,
    private drawerService: NzDrawerService,
    private route: Router
  ) {}

  loading!: boolean;
  mortgageTypes: MortgageType[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  totalElements = 0;

  ngOnInit(): void {
    this.getMortgageType();
  }

  getMortgageType (reset: boolean = false) {
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
  openCaseDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateMortgageTypeComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Mortgage-type `,
      nzWidth:600,
      nzContent: CreateMortgageTypeComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getMortgageType()
    })
  }

}
