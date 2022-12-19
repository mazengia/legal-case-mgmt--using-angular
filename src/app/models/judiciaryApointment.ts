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
export class JudiciaryAppointment {
  appointmentId?: number;
  appointmentDate?: Date;
  appointmentReason?: string;
  maintained_by?: Employee;
  litigation?: Litigation;
}
export class JudiciaryAppointmentResponse {
  '_embedded': {
    judicialAppointmentDtoes: JudiciaryAppointment[];
  };
  page?: Page;
}
