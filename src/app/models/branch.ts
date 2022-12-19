import {Page} from "./Page";

export class Branch {
  id?: number;
  code?: string;
  name?: string;
}

export class BranchResponse {
  '_embedded': {
    branchDtoes: Branch[];
  };
  page?: Page;
}
