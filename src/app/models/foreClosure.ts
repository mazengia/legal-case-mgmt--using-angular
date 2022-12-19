import {Page} from "./Page";
import {MortgageDetail} from "./mortgage-detail";
import {AuctionType} from "./auction-type";

export class ForeClosure {
  foreClosureId?: number;
  dateAuctionAnnounced?: string;
  dateAuctionConducted?: string;
  status?: string;
  auctionType?: AuctionType;
  mortgageDetail?: MortgageDetail;
}

export class ForeClosureResponse {
  '_embedded': {
    foreClosureDtoes: ForeClosure[];
  };
  page?: Page;
}
