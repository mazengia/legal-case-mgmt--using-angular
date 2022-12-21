import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Expense} from 'src/app/models/expense';
import {environment} from 'src/environments/environment';

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class AppealService {
  constructor(private http: HttpClient) {}

  getAppeal = (pageNumber?: number, pageSize?: number): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<any>(`${BASE_URL}/appeal`, { params: params });
  };

  createAppeal = (expense: any): Observable<any> => {
    return this.http.post<any>(`${BASE_URL}/appeal`, { ...expense });
  };

  getAppealById = (id: any): Observable<any> => {
    return this.http.get<Expense>(`${BASE_URL}/appeal/${id}`);
  };

  updateAppeal = (id: any, appeal: any): Observable<any> => {
    return this.http.put<any>(
      `${BASE_URL}/appeal/${id}`,
      appeal
    );
  };
}
