import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Advocate, AdvocateResponse} from "../../models/advocate";
import {ForeClosure, ForeClosureResponse} from "../../models/foreClosure";

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class ForeClosureService {
  constructor(private http: HttpClient) {}

  getForeClosureService = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<ForeClosureResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<ForeClosureResponse>(`${BASE_URL}/foreClosure`, { params: params });
  };

  createForeClosure = (foreClosure: ForeClosure): Observable<ForeClosure> => {
    return this.http.post<ForeClosure>(`${BASE_URL}/foreClosure`, {foreClosure });
  };

  getForeClosureById = (id: number | undefined): Observable<ForeClosureResponse> => {
    return this.http.get<ForeClosureResponse>(`${BASE_URL}/foreClosure/${id}`);
  };

  updateForeClosure = (id: number | undefined, foreClosure: ForeClosure): Observable<ForeClosure> => {
    return this.http.put<ForeClosure>(
      `${BASE_URL}/foreClosure/${id}`,
      foreClosure
    );
  };
}
