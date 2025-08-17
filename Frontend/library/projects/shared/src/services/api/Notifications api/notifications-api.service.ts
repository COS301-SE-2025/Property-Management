import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Notification } from "../../../public-api";
import { map, Observable } from 'rxjs';
import { environmentMobile } from '../../../environment';

export interface InviteWithTrustee2 {
  inviteUuid: string;
  status: string;
  invitedOn: string;
  trusteeUuid: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})

export class NotificationsApiService{
    // private url = '/api';
    private url = environmentMobile.apiUrl;
    constructor(private http: HttpClient) {}

    createNotifications(Notifications: Notification)
    {
        return this.http.post<Notification>(`${this.url}/notifications`, Notifications);
    }
    getNotifications(recipientType: string, recipientId: string)
    {
        const cacheBuster = Date.now();
        return this.http.get<Notification[]>(`${this.url}/notifications?recipientType=${recipientType}&recipientUuid=${recipientId}&_=${cacheBuster}`).pipe(map(res => res || []));
    }
    markNotificationsAsRead(NotificationsId: string)
    {
        return this.http.put<Notification>(`${this.url}/notifications/${NotificationsId}/read`, {});
    }

    getInviteById(inviteUuid: string): Observable<InviteWithTrustee2> 
    {
        return this.http.get<InviteWithTrustee2>(`/api/invites/${inviteUuid}`);
    } 
}
