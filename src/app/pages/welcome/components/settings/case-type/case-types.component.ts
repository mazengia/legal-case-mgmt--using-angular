import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseTypeService } from 'src/app/pages/services/case-type/case-type.service';

@Component({
  selector: 'app-case-types',
  templateUrl: './case-types.component.html',
  styleUrls: ['./case-types.component.scss'],
})
export class CaseTypesComponent implements OnInit {
  constructor(
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

  onCreateCaseType = () => {
    this.route.navigate(['/home/create-case-type']);
  };

  onUpdateCaseType = (caseTypeId: number) => {
    console.log(caseTypeId);
    this.route.navigate(['/home/update-case-type/', caseTypeId]);
  };
}
