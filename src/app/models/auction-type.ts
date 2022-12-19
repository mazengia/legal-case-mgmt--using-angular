import {Page} from "./Page";

export class AuctionType {
  auctionTypeId?:number;
  auctionTypeName?: string;
  auctionTypeColor?: string;
  remark?: string;
}
export class AuctionTypeResponse {
  '_embedded': {
    auctionTypeDtoes: AuctionType[];
  };
  page?: Page;
}
