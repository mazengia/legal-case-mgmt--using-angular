import {Page} from "./Page";
import {MortgageType} from "./mortgage-type";

export class MortgageDetail {
  mortgageDetailId?: number;
  plateNumber?: string;
  shansiNumber?: string;
  motorNumber?: string;
  machineryType?: string;
  numberOfTitleIndeed?: string;
  dateCollateralRegistered?: string;
  remark?: string;

  isWrittenLegalNoticeServed?: boolean;
  dateLegalNoticeServed?: string;
  isCollateralEstimated?: boolean;
  dateCollateralIsEstimated?: string;
  mortgagor?: string;
  borrower?: string;

  mortgageType?: MortgageType;
}

export class MortgageDetailResponse {
  '_embedded': {
    mortgageDetailDtoes: MortgageDetail[];
  };
  page?: Page;
}
