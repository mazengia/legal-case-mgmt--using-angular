import {Page} from "./Page";
import {Employee} from "./employee";

export class interveneAddress {
  state?: string;
  city?: string;
  subCity?: string;
  woredaOrKebele?: string;
  houseNo?: string;
}

export class Intervene {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  interveneId?: number;
  firstName?: string;
  lastName?: string;
  interveneAddress?:interveneAddress;
  maintained_by?: Employee;
}

export class InterveneResponse {
  '_embedded': {
    interveneDtoes: Intervene[];
  };
  page?: Page;
}
