import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CommentResponse, Comments} from "../../models/comments";

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments = (pageNumber?: number, pageSize?: number): Observable<CommentResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<CommentResponse>(`${BASE_URL}/comments`, { params: params });
  };

  createComment = (comment: Comments): Observable<Comments> => {
    return this.http.post<Comments>(`${BASE_URL}/comments`, { ...comment });
  };

  getCommentById = (id: any): Observable<Comments> => {
    return this.http.get<Comments>(`${BASE_URL}/comments/${id}`);
  };
  getCommentByLitigationId = (id: any): Observable<Comments> => {
    return this.http.get<Comments>(`${BASE_URL}/comments/litigation-id/${id}`);
  };


  updateComment= (id: any, comment: Comments): Observable<Comments> => {
    return this.http.put<Comments>(
      `${BASE_URL}/comments/${id}`,comment
    );
  };
}
