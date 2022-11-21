import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseType } from 'src/app/pages/models/case-type/case-type';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class CaseTypeService {
  constructor(private http: HttpClient) {}

  getCaseTypes = (pageNumber?: number, pageSize?: number): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<any>(`${BASE_URL}/case-types`, { params: params });
  };

  createCaseType = (caseType: CaseType): Observable<CaseType> => {
    return this.http.post<CaseType>(`${BASE_URL}/case-types`, { ...caseType });
  };

  getCaseType = (caseTypeId: number): Observable<CaseType> => {
    return this.http.get<CaseType>(`${BASE_URL}/case-types/${caseTypeId}`);
  };

  updateCaseType = (caseTypeId: number, expense: CaseType): Observable<any> => {
    return this.http.put<CaseType>(
      `${BASE_URL}/case-types/${caseTypeId}`,
      expense
    );
  };
}
