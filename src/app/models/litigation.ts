import {Injectable} from '@angular/core';
import {CaseType} from "./case-type";
import {Branch} from "./branch";
import {Page} from "./Page";
import {Intervene} from "./intervene";
import {Advocate} from "./advocate";

@Injectable({
  providedIn: 'root'
})
export class Plaintiff {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  accountNumber?: string;
  phoneNumber?: string;
}

export class Defendant {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  accountNumber?: string;
  phoneNumber?: string;
}

export class Contact {
  email?: string;
}

export class AttorneyHandlingTheCase {
  employeeId?: string;
  fullName?: string
  contact?: Contact;
}

export class Litigation {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  litigationId?: number;
  fileNumber?: string;
  courtAdjudicating?: string;
  litigationType?: string;
  isBankPlaintiff?: boolean;
  caseStage?: string;
  branch?: Branch;
  plaintiff?: Plaintiff;
  defendant?: Defendant;
  attorneyHandlingTheCase?: AttorneyHandlingTheCase;
  intervene?: Intervene;
  advocate?: Advocate;
  caseType?: CaseType;
}
export class LitigationResponse {
  '_embedded': {
    litigationDtoes: Litigation[];
  };
  page?: Page;
}

