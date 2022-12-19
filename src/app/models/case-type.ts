import {Page} from "./Page";

export class CaseType {
  caseTypeId?: number;
  remark?: string;
  caseTypeName?: string;
  caseTypeColor?: string;
}

export class CaseTypeResponse {
  _embedded?: {
    caseTypeDtoes: CaseType;
  }
  page?: Page;
}
