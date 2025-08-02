import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Notification } from "../../../public-api";

@Injectable({
  providedIn: 'root'
})

export class NotificationsApiService{
    private url = '/api';
    constructor(private http: HttpClient) {}

    createNotifications(Notifications: Notification)
    {
        return this.http.post<Notification>(`${this.url}/notifications`, Notifications);
    }
    getNotifications(recipientType: string, recipientId: string)
    {
        return this.http.get<Notification[]>(`${this.url}/notifications?recipientType=${recipientType}&recipientUuid=${recipientId}`);
    }
    markNotificationsAsRead(NotificationsId: string)
    {
        return this.http.put<Notification>(`${this.url}/notifications/${NotificationsId}/read`, {});
    }
}
