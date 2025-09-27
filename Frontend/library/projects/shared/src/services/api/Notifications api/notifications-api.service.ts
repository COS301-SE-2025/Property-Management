import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Notification } from "../../../public-api";
import { map, Observable } from 'rxjs';
import { environmentMobile } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsApiService {
  private url = environmentMobile.apiUrl;
  constructor(private http: HttpClient) {}

  createNotifications(Notifications: Notification) {
    return this.http.post<Notification>(`${this.url}/notifications`, Notifications, { withCredentials: true });
  }

  createNotification(notification: {
    type: string;
    message: string;
    recipientUuid: string;
    metadata?: any;
  }) {
    const notificationPayload: Notification = {
      notificationType: notification.type,
      message: notification.message,
      recipientType: 'trustee',
      recipientUuid: notification.recipientUuid,
      isRead: false
    };
    
    return this.http.post<Notification>(`${this.url}/notifications`, notificationPayload, { withCredentials: true });
  }

  getNotifications(recipientType: string, recipientId: string) {
    const cacheBuster = Date.now();
    return this.http.get<Notification[]>(`${this.url}/notifications?recipientType=${recipientType}&recipientUuid=${recipientId}&_=${cacheBuster}`, { withCredentials: true }).pipe(map(res => res || []));
  }

  markNotificationsAsRead(NotificationsId: string) {
    return this.http.put<Notification>(`${this.url}/notifications/${NotificationsId}/read`, {withCredentials: true });
  }

  getInviteById(inviteUuid: string): Observable<any> {
    return this.http.get<any>(`/api/invites/${inviteUuid}`, { withCredentials: true });
  }
}