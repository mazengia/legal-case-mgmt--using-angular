import {Page} from "./Page";
import {Litigation} from "./litigation";

export class Appeal {
  appealId?: number;
  reason?: string;
  litigation?:Litigation;
}
export class AppealResponse {
  '_embedded': {
    appealDtoes: Appeal[];
  };
  page?: Page;
}
