import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {MortgageDetail} from "../../models/mortgage-detail";

const BASE_URL = environment.Back_End_Url;
@Injectable({
  providedIn: 'root',
})
export class MortgageDetailService {
  constructor(private http: HttpClient) {}

  getMortgageDetail = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<MortgageDetail>(`${BASE_URL}/mortgage-detail`, { params: params });
  };

  createMortgageDetail = (
    mortgageDetail: MortgageDetail
  ): Observable<MortgageDetail> => {
    return this.http.post<MortgageDetail>(`${BASE_URL}/mortgage-detail`,
      {...mortgageDetail,
    });
  };

  getMortgageDetailById = (id: any): Observable<MortgageDetail> => {
    return this.http.get<MortgageDetail>(
      `${BASE_URL}/mortgage-detail/${id}`
    );
  };

  updateMortgageDetail = (
    id: any,
    mortgageDetail: MortgageDetail
  ): Observable<MortgageDetail> => {
    return this.http.put<MortgageDetail>(
      `${BASE_URL}/mortgage-detail/${id}`,
      mortgageDetail
    );
  };
}
