import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Expense} from 'src/app/models/expense';
import {environment} from 'src/environments/environment';

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getExpenses = (pageNumber?: number, pageSize?: number): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<any>(`${BASE_URL}/expense-types`, { params: params });
  };

  createExpense = (expense: any): Observable<any> => {
    return this.http.post<any>(`${BASE_URL}/expense-types`, { ...expense });
  };

  getExpense = (expenseId: number): Observable<Expense> => {
    return this.http.get<Expense>(`${BASE_URL}/expense-types/${expenseId}`);
  };

  updateExpense = (expenseId: any, expense: Expense): Observable<any> => {
    return this.http.put<Expense>(
      `${BASE_URL}/expense-types/${expenseId}`,
      expense
    );
  };
}
