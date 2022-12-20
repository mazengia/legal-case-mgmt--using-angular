import {Page} from "./Page";
import {ForeClosure} from "./foreClosure";

export class AuctionType {
  auctionTypeId?: number;
  auctionTypeName?: string;
  auctionTypeColor?: string;
  dateAuctionAnnounced?: string;
  dateAuctionConducted?: string;
  foreClosure?: ForeClosure;
  remark?: string;
}

export class AuctionTypeResponse {
  '_embedded': {
    auctionTypeDtoes: AuctionType[];
  };
  page?: Page;
}
