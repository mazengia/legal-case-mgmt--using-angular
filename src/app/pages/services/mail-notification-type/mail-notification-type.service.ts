import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MailNotificationType } from '../../models/mail-notification-type/mail-notification-type';

const BASE_URL = environment.BASE_URL;
@Injectable({
  providedIn: 'root',
})
export class MailNotificationTypeService {
  constructor(private http: HttpClient) {}

  getMailNotificationTypes = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<any>(`${BASE_URL}/mail-notification-types`, {
      params: params,
    });
  };

  createMailNotificationType = (
    mailNotificationType: MailNotificationType
  ): Observable<MailNotificationType> => {
    return this.http.post<MailNotificationType>(
      `${BASE_URL}/mail-notification-types`,
      { ...mailNotificationType }
    );
  };

  getMailNotificationType = (
    mailNotificationTypeId: number
  ): Observable<MailNotificationType> => {
    return this.http.get<MailNotificationType>(
      `${BASE_URL}/mail-notification-types/${mailNotificationTypeId}`
    );
  };

  updateMailNotificationType = (
    mailNotificationTypeId: number,
    expense: MailNotificationType
  ): Observable<any> => {
    return this.http.put<MailNotificationType>(
      `${BASE_URL}/mail-notification-types/${mailNotificationTypeId}`,
      expense
    );
  };
}
