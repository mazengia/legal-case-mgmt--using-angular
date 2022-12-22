import {Page} from "./Page";
import {Litigation} from "./litigation";

export class Comments {
  deleted?: boolean;
  deletedBy?: string;
  version?: number;
  commentId?: number;
  content?: string;
  createdBy?:string;
  createdAt?:string;
  litigation?: Litigation;
}
export class CommentResponse {
  '_embedded': {
    commentDtoes: Comments[];
  };
  page?: Page;
}
