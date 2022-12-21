import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Intervene, InterveneResponse} from "../../models/intervene";

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class InterveneService {
  constructor(private http: HttpClient) {}

  getIntervene = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<InterveneResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<InterveneResponse>(`${BASE_URL}/intervenes`, { params: params });
  };

  createIntervene = (intervene: Intervene): Observable<Intervene> => {
    return this.http.post<Intervene>(`${BASE_URL}/intervenes`, {...intervene });
  };

  getInterveneById = (id: number | undefined): Observable<InterveneResponse> => {
    return this.http.get<InterveneResponse>(`${BASE_URL}/intervenes/${id}`);
  };

  updateIntervene = (id: number | undefined, expense: Intervene): Observable<Intervene> => {
    return this.http.put<Intervene>(
      `${BASE_URL}/intervenes/${id}`,
      expense
    );
  };
}
