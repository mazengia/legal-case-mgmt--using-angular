import { Page } from '../page/page';

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
