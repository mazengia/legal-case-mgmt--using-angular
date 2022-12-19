import {Employee} from "./employee";
import {Page} from "./Page";
import {Litigation} from "./litigation";

export class Appointment {
  appointmentId?: number;
  appointmentDate?: Date;
  litigation?: Litigation;
  maintained_by?: Employee;
  appointmentReason?:string;

}
export class AppointmentResponse {
  '_embedded': {
    judicialAppointmentDtoes: Appointment[];
  };
  page?: Page;
}
