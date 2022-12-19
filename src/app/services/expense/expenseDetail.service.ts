import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ExpenseDetail, ExpenseDetailResponse} from "../../models/expenseDetail";

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class ExpenseDetailService {
  constructor(private http: HttpClient) {}

  getExpensesDetail = (pageNumber?: number, pageSize?: number): Observable<ExpenseDetailResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<ExpenseDetailResponse>(`${BASE_URL}/expense-detail`, { params: params });
  };

  createExpenseDetail = (expenseDetail: ExpenseDetail): Observable<ExpenseDetail> => {
    return this.http.post<ExpenseDetail>(`${BASE_URL}/expense-detail`, { ...expenseDetail });
  };

  getExpenseDetail = (id:any): Observable<ExpenseDetail> => {
    return this.http.get<ExpenseDetail>(`${BASE_URL}/expense-detail/${id}`);
  };

  updateExpenseDetail = (id:any , expenseDetail: ExpenseDetail): Observable<ExpenseDetail> => {
    return this.http.put<ExpenseDetail>(
      `${BASE_URL}/expense-detail/${id}`,
      expenseDetail
    );
  };

  findExpenseDetailByAppointmentId = (id: number | undefined): Observable<ExpenseDetailResponse> => {
    return this.http.get<ExpenseDetailResponse>(`${BASE_URL}/expense-detail/appointment-id/${id}`);
  };
}
