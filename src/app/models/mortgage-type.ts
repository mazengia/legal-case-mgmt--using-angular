import {MailNotificationType} from './mail-notification-type';
import {Page} from "./Page";
import {Employee} from "./employee";

export class MortgageType {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  mortgageTypeId?: number;
  mortgageTypeName?: string;
  mailNotificationType?: MailNotificationType;
  maintained_by?: Employee;
}
export class MortgageTypeResponse {
  '_embedded': {
    mortgageTypeDtoes: MortgageType[];
  };
  page?: Page;
}
