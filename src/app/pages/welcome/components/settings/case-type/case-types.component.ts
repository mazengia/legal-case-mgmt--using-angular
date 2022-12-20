import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CaseTypeService} from 'src/app/services/case-type/case-type.service';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {CreateCaseTypeComponent} from "./create-case-type/create-case-type.component";

@Component({
  selector: 'app-case-types',
  templateUrl: './case-types.component.html',
  styleUrls: ['./case-types.component.scss'],
})
export class CaseTypesComponent implements OnInit {
  constructor(
    private drawerService: NzDrawerService,
    private caseTypeService: CaseTypeService,
    private route: Router
  ) {}

  loading!: boolean;
  caseTypes: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  ngOnInit(): void {
    this.onGetCaseTypes();
  }

  onGetCaseTypes = () => {
    this.loading = true;
    this.caseTypeService.getCaseTypes(this.pageIndex, this.pageSize).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.loading = false;
          this.caseTypes = res?._embedded?.caseTypeDtoes;
          console.log(this.caseTypes);
        }, 1000);
      },
      (error: any) => {
        this.loading = false;
      }
    );
  };
  openCaseDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateCaseTypeComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Case-type `,
      nzWidth:600,
      nzContent: CreateCaseTypeComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.onGetCaseTypes()
    })
  }

}
