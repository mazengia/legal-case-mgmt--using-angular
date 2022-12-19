import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Branch, BranchResponse} from '../../models/branch';

const HR_URL = environment.HR_HOST;

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getBranches(
    pageIndex: number = 0,
    pageSize: number = 100000
  ): Observable<BranchResponse> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:123456') });
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`);
    return this.http.get<BranchResponse>(`${HR_URL}/branches`, { params });
  }

  getBranchByCode(branchId?: number) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:123456'),
    });
    return this.http.get<Branch>(`${HR_URL}/branches/${branchId}`);
  }

  createBranch(branch: Branch) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:123456'),
    });
    return this.http
      .post(`${HR_URL}/branches`, { ...branch })
      .pipe(catchError(this.errorHandler));
  }

  updateBranch(branchId: number, branchDetail?: any) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:123456'),
    });
    return this.http
      .put(`${HR_URL}/branches/${branchId}`, { ...branchDetail }, { headers })
      .pipe(catchError(this.errorHandler));
  }

  search(searchValue?: any): Observable<BranchResponse> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:123456'),
    });
    const params = new HttpParams().append('name', `${searchValue}`);

    return this.http.get<BranchResponse>(`${HR_URL}/branches`, {
      params,
      headers,
    });
  }
  deleteBranch(branchId?: number) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:123456'),
    });
    return this.http
      .delete(`${HR_URL}/branches/${branchId}`, { headers })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  //    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:123456') });
}
