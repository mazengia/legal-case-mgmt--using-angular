import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Advocate, AdvocateResponse} from "../../models/advocate";

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class AdvocateService {
  constructor(private http: HttpClient) {}

  getAdvocate = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<AdvocateResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<AdvocateResponse>(`${BASE_URL}/advocates`, { params: params });
  };

  createAdvocate = (advocate: Advocate): Observable<Advocate> => {
    return this.http.post<Advocate>(`${BASE_URL}/advocates`, {advocate });
  };

  getAdvocateById = (id: number | undefined): Observable<AdvocateResponse> => {
    return this.http.get<AdvocateResponse>(`${BASE_URL}/advocates/${id}`);
  };

  updateAdvocate = (id: number | undefined, expense: any): Observable<Advocate> => {
    return this.http.put<Advocate>(
      `${BASE_URL}/advocates/${id}`,
      expense
    );
  };
}
