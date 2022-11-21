import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionTypeService } from 'src/app/pages/services/auction-type/auction-type.service';

@Component({
  selector: 'app-auction-types',
  templateUrl: './auction-types.component.html',
  styleUrls: ['./auction-types.component.scss'],
})
export class AuctionTypesComponent implements OnInit {
  constructor(
    private auctionTypeService: AuctionTypeService,
    private route: Router
  ) {}

  loading!: boolean;
  auctionTypes: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;

  ngOnInit(): void {
    this.onGetExpenseTypes(this.pageNumber, this.pageSize);
  }

  onGetExpenseTypes = (pageNumber?: number, pageSize?: number) => {
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

  onCreateAuctionType = () => {
    this.route.navigate(['/home/create-auction-type']);
  };

  onUpdateAuctionType = (auctionTypeId: number) => {
    console.log(auctionTypeId);
    this.route.navigate(['/home/update-auction-type/', auctionTypeId]);
  };
}
