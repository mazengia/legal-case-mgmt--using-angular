import {Employee} from "./employee";
import {Page} from "./Page";
import {Litigation} from "./litigation";

export class Adjournment {
  adjournmentId?: number;
  date?: Date;
  reason?: string;
  litigation?: Litigation;
  maintained_by?: Employee;

}
export class AdjournmentResponse {
  '_embedded': {
    adjournmentDtoes: Adjournment[];
  };
  page?: Page;
}
