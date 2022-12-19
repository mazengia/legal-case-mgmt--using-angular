// import {HttpClient, HttpParams} from '@angular/common/http';
// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import {environment} from 'src/environments/environment';
// import {ExpenseDetail, expenseDetailResponse} from "../../models/expenseDetail";
// import {JudiciaryAppointment, JudiciaryAppointmentResponse} from "../../models/judiciaryApointment";
//
// const BASE_URL = environment.Back_End_Url;
//
// @Injectable({
//   providedIn: 'root',
// })
// export class JudicialAppointmentService {
//   constructor(private http: HttpClient) {}
//
//   createAppointment = (id: number, judiciaryAppointment: JudiciaryAppointment): Observable<JudiciaryAppointment> => {
//     return this.http.post<any>(
//       `${BASE_URL}/judicial-appointments`,
//       {
//         ...judiciaryAppointment,
//       }
//     );
//   };
//
//   getAppointment = (pageNumber?: number, pageSize?: number): Observable<JudiciaryAppointmentResponse> => {
//     const params = new HttpParams()
//       .append('page', `${pageNumber}`)
//       .append('size', `${pageSize}`);
//     return this.http.get<JudiciaryAppointmentResponse>(`${BASE_URL}/judicial-appointments`, { params: params });
//   };
//   getAppointmentById = (id:JudiciaryAppointmentResponse): Observable<JudiciaryAppointmentResponse> => {
//     return this.http.get<JudiciaryAppointmentResponse>(`${BASE_URL}/judicial-appointments/${id}`);
//   };
//
//   updateAppointment = (id:any , judiciaryAppointment: JudiciaryAppointment): Observable<JudiciaryAppointment> => {
//     return this.http.put<JudiciaryAppointment>(
//       `${BASE_URL}/judicial-appointments/${id}`,
//       judiciaryAppointment
//     );
//   };
// }
