import {Page} from "./Page";
import {Expense} from "./expense";
import {Appointment} from "./appointment";

export class ExpenseDetail {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  expense_detail_id?: number;
  amount?: number;
  expense?: Expense;
  miscellaneous?: number;
  judicialAppointment?: Appointment;
}
export class ExpenseDetailResponse {
  '_embedded': {
    expenseDetailDtoes: ExpenseDetail[];
  };
  page?: Page;
}
