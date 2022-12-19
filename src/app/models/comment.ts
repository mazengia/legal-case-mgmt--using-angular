import {Page} from "./Page";
import {Employee} from "./employee";
import {Litigation} from "./litigation";
import {JudiciaryReport} from "./judiciaryReport";

export class Comment {
  deleted?: boolean;
  deletedBy?: string;
  remark?: string;
  version?: number;
  commentId?: number;
  content?: string;
  sender?: Employee;
  litigation?: Litigation;
  judiciaryReport?: JudiciaryReport;
}
export class CommentResponse {
  '_embedded': {
    commentDtoes: Comment[];
  };
  page?: Page;
}
