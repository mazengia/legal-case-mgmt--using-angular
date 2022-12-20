import {Page} from "./Page";
import {MortgageDetail} from "./mortgage-detail";

export class ForeClosure {
  foreClosureId?: number;
  status?: string;
  mortgageDetail?: MortgageDetail;
}

export class ForeClosureResponse {
  '_embedded': {
    foreClosureDtoes: ForeClosure[];
  };
  page?: Page;
}
