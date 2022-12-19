import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Appointment, AppointmentResponse} from "../../models/appointment";

const BASE_URL = environment.Back_End_Url;

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {
  }

  getAppointment = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<AppointmentResponse> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<AppointmentResponse>(`${BASE_URL}/judicial-appointments`, {params: params});
  };

  createAppointment = (appointment: Appointment): Observable<Appointment> => {
    return this.http.post<Appointment>(`${BASE_URL}/judicial-appointments`, {...appointment});
  };

  getAppointmentById = (id: number | undefined): Observable<AppointmentResponse> => {
    return this.http.get<AppointmentResponse>(`${BASE_URL}/judicial-appointments/${id}`);
  };
  findJudicialAppointmentByLitigationLitigationId = (id: number | undefined): Observable<AppointmentResponse> => {
    return this.http.get<AppointmentResponse>(`${BASE_URL}/judicial-appointments/litigation-appointment/${id}`);
  };
  updateAppointment = (id: number | undefined, appointment: Appointment): Observable<Appointment> => {
    return this.http.put<Appointment>(
      `${BASE_URL}/judicial-appointments/${id}`, appointment
    );
  };
}
