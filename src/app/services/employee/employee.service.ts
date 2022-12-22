import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Employee} from 'src/app/models/employee';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeByEmployeeId(employeeId: string) {
    return this.http.get<Employee>(
      `${environment.HR_HOST}/employees/by-employeeId/${employeeId}`
    );
  }

  getEmployee(pageIndex: number = 0,
              pageSize: number = 100000000000) {
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`);
    return this.http.get<Employee>(
      `${environment.HR_HOST}/employees`,{ params });
  }
}
