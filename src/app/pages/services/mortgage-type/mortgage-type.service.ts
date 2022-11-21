import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MortgageType } from '../../models/mortgage-type/mortgage-type';

const BASE_URL = environment.BASE_URL;
@Injectable({
  providedIn: 'root',
})
export class MortgageTypeService {
  constructor(private http: HttpClient) {}
  // MortgageType

  getMortgageTypes = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<any>(`${BASE_URL}/mortgage-types`, { params: params });
  };

  createMortgageType = (
    mortgageType: MortgageType
  ): Observable<MortgageType> => {
    return this.http.post<MortgageType>(`${BASE_URL}/mortgage-types`, {
      ...mortgageType,
    });
  };

  getMortgageType = (mortgageTypeId: number): Observable<MortgageType> => {
    return this.http.get<MortgageType>(
      `${BASE_URL}/mortgage-types/${mortgageTypeId}`
    );
  };

  updateMortgageType = (
    mortgageTypeId: number,
    expense: MortgageType
  ): Observable<any> => {
    return this.http.put<MortgageType>(
      `${BASE_URL}/mortgage-types/${mortgageTypeId}`,
      expense
    );
  };
}
