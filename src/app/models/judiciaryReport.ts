import {Page} from "./Page";
import {Employee} from "./employee";
import {Litigation} from "./litigation";

export interface NextAppointment {
  deleted: boolean;
  deletedBy: string;
  remark: string;
  version: number;
  adjournmentId: number;
  date: Date;
  reason: string;
  litigation: Litigation;
  maintained_by: Employee;
}
export class JudiciaryReport {
  reportId?: number;
  courtAddress?: string;
  judicialFee?: number;
  judicialAppointmentDate?: Date;
  adjournmentReason?: string;
  nextAppointment?: NextAppointment;
  maintained_by?: Employee;
  litigation?: Litigation;
  comments?: Comment;
}
export class JudiciaryReportResponse {
  '_embedded': {
    judiciaryReportDtoes: JudiciaryReport[];
  };
  page?: Page;
}
