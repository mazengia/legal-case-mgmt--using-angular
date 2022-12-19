import {Page} from "./Page";
import {Employee} from "./employee";
import {MortgageType} from "./mortgage-type";

export class MailNotificationType {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  mailNotificationTypeId?: number;
  mailTypeName?: string;
  numberOfDays?: number;
  color?: string;
  maintained_by?: Employee;
  mortgageType?: MortgageType;
}
export class MailNotificationTypeResponse {
  '_embedded': {
    mailNotificationTypeDtoes: MailNotificationType[];
  };
  page?: Page;
}
