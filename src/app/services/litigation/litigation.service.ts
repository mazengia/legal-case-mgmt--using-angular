import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Litigation, LitigationResponse} from "../../models/litigation";

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class LitigationService {
  constructor(private http: HttpClient) {}

  getLitigations = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<LitigationResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<LitigationResponse>(`${BASE_URL}/litigations`, { params: params });
  };
  getLitigationByBranchId = (
    pageNumber?: number,
    pageSize?: number,
    ranchId?:any
  ): Observable<LitigationResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<LitigationResponse>(`${BASE_URL}/litigations/branch-id/${ranchId}`, { params: params });
  };
  findLitigationByAttorneyHandlingTheCase = (
    pageNumber?: number,
    pageSize?: number,
    attorney?:any
  ): Observable<LitigationResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<LitigationResponse>(`${BASE_URL}/litigations/attorney/${attorney}`, { params: params });
  };
  findLitigationByStatus = (
    pageNumber?: number,
    pageSize?: number,
    status?:any
  ): Observable<LitigationResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<LitigationResponse>(`${BASE_URL}/litigations/status/${status}`, { params: params });
  };

  createLitigation = (litigation: Litigation): Observable<Litigation> => {
    return this.http.post<Litigation>(`${BASE_URL}/litigations`, { ...litigation });
  };

  getLitigationById = (litigationId: any): Observable<LitigationResponse> => {
    return this.http.get<LitigationResponse>(`${BASE_URL}/litigations/${litigationId}`);
  };
  getLitigationByCaseStage = ( caseStage="POST_TRIAL"): Observable<LitigationResponse> => {
    return this.http.get<LitigationResponse>(`${BASE_URL}/litigations/case-stage/${caseStage}`);
  };


  updateLitigation = (litigationId: number | undefined, expense: Litigation): Observable<Litigation> => {
    return this.http.put<Litigation>(
      `${BASE_URL}/litigations/${litigationId}`,
      expense
    );
  };
}
