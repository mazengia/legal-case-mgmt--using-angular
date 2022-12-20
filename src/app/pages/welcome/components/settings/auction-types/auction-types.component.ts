import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuctionTypeService} from 'src/app/services/auction-type/auction-type.service';
import {CreateCaseTypeComponent} from "../case-type/create-case-type/create-case-type.component";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {CreateAuctionTypeComponent} from "./create-auction-type/create-auction-type.component";
import {AuctionType} from "../../../../../models/auction-type";

@Component({
  selector: 'app-auction-types',
  templateUrl: './auction-types.component.html',
  styleUrls: ['./auction-types.component.scss'],
})
export class AuctionTypesComponent implements OnInit {
  constructor(
    private drawerService: NzDrawerService,
    private auctionTypeService: AuctionTypeService,
    private route: Router
  ) {}

  loading!: boolean;
  auctionTypes: AuctionType[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;

  ngOnInit(): void {
    this.getAllAuctionType(this.pageNumber, this.pageSize);
  }

  getAllAuctionType = (pageNumber?: number, pageSize?: number) => {
    this.loading = true;
    this.auctionTypeService.getAuctionTypes(pageNumber, pageSize).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.loading = false;
          this.auctionTypes = res?._embedded?.auctionTypeDtoes;
          console.log(this.auctionTypes);
        }, 1000);
      },
      (error: any) => {
        this.loading = false;
      }
    );
  };


  openAuctionTypeDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateAuctionTypeComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Auction-type `,
      nzWidth:400,
      nzContent: CreateAuctionTypeComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.getAllAuctionType()
    })
  }

  onUpdateAuctionType = (auctionTypeId: number) => {
    console.log(auctionTypeId);
    this.route.navigate(['/update-auction-type/', auctionTypeId]);
  };
}
