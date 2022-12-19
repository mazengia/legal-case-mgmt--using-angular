import {Page} from "./Page";

export class Advocate {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  advocateId?: number;
  firstName?: string;
  lastName?: string;
  date?:Date;

}
export class AdvocateResponse {
  '_embedded': {
    advocateDtoes: Advocate[];
  };
  page?: Page;
}
