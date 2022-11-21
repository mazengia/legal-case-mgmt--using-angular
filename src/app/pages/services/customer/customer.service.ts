import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../../models/custmer/customer';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  finCustomerDetailsByAccountNumber = (
    accountNumber: string
  ): Observable<Customer> => {
    const params = new HttpParams().append('accountNumber', `${accountNumber}`);
    return this.http.get<Customer>(`${BASE_URL}/customers`, { params: params });
  };
}
