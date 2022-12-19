import {Page} from "./Page";
import {Employee} from "./employee";

export class Expense {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  expenseId?: number;
  expenseName?: string;
  expenseTypeColor?: string;
  maintained_by?: Employee;
}
export class ExpenseResponse {
  '_embedded': {
    expenseDtoes: Expense[];
  };
  page?: Page;
}
