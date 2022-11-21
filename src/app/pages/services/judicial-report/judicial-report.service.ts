import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class JudicialReportService {
  constructor(private http: HttpClient) {}

  createReport = (litigationId: number, report: any): Observable<any> => {
    return this.http.post<any>(
      `${BASE_URL}/judiciary-reports/${litigationId}`,
      {
        ...report,
      }
    );
  };
}
