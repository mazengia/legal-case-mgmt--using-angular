import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class LitigationService {
  constructor(private http: HttpClient) {}

  getLitigations = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<any>(`${BASE_URL}/litigations`, { params: params });
  };

  createLitigation = (litigation: any): Observable<any> => {
    return this.http.post<any>(`${BASE_URL}/litigations`, { ...litigation });
  };

  getLitigation = (litigationId: number): Observable<any> => {
    return this.http.get<any>(`${BASE_URL}/litigations/${litigationId}`);
  };

  updateLitigation = (litigationId: number, expense: any): Observable<any> => {
    return this.http.put<any>(
      `${BASE_URL}/litigations/${litigationId}`,
      expense
    );
  };
}
