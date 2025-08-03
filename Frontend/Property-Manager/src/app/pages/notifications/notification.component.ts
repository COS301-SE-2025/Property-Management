import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TimelineModule } from 'primeng/timeline';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getCookieValue, NotificationsApiService, Notification, FormatTimePipe } from 'shared';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InviteDialogComponent } from "./invite-dialog/invite-dialog.component";

@Component({
  selector: 'app-notifications',
  imports: [HeaderComponent, TimelineModule, CommonModule, FormatTimePipe, InviteDialogComponent],
  templateUrl: './notification.component.html',
  styles: ``,
  animations: [
    trigger('floatUp', [
      state('void', style({
        transform: 'translateY(20%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('600ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class NotificationComponent  implements OnInit {

  public unreadTimeline = signal<Notification[]>([]);
  public timeline = signal<Notification[]>([]);
  private userId: string | null = null;
  public notiError = false;
  public inviteId = signal<string | null>(null);
  public inviteDialogVisible = false;

  constructor(private router: Router, private notificationService: NotificationsApiService) { }

  async ngOnInit() {
    this.loadTimeline();
  }
  loadTimeline()
  {
    const type = this.getUserType();
    if(this.userId && type)
    {
        this.notificationService.getNotifications(type, this.userId).subscribe({
            next: (noti) => {
              const unread: Notification[] = [];
              const read: Notification[] = [];

              noti.forEach(n => {
                if(n.isRead)
                {
                  read.push(n);
                }
                else
                {
                  unread.push(n);
                }
              });

              const sortedRead = this.sortTimeline(read);
              const sortUnRead = this.sortTimeline(unread);

              this.timeline.set(sortedRead);
              this.unreadTimeline.set(sortUnRead);
            },
            error: (err) => {
              console.error(err);
              this.notiError = true;
            }
        });
    }
  }
  showDetails(noti: Notification)
  {
    //Mark as read
    this.notificationService.markNotificationsAsRead(noti.notificationUuid!).subscribe({
      next: () => {
        if(noti.relatedInviteUuid && this.getUserType() === 'trustee')
        {
          //confirm dialog pop up
          this.inviteId.set(noti.relatedInviteUuid);
          this.inviteDialogVisible = true;
        }
        else if(noti.relatedTaskUuid)
        {
          if(this.getUserType() === 'trustee' || this.getUserType() === 'bodyCorporate')
          {
            this.router.navigate(['/taskDetails', noti.relatedTaskUuid]);
          }
        }
        else if(noti.relatedSessionUuid)
        {
          if(this.getUserType() === 'trustee' || this.getUserType() === 'bodyCorporate')
          {
            this.router.navigate(['/voting', noti.relatedSessionUuid]);
          }
        }
        else if(noti.relatedQuoteUuid)
        {
          //Contractor can see their quote they made
        }
        else
        {
          window.location.reload();
        }
      }
    });
  }
  private getUserType(): string | null {
    if (getCookieValue(document.cookie, 'trusteeId')) {
        this.userId = getCookieValue(document.cookie, 'trusteeId');
        return 'trustee';
    } 
    else if (getCookieValue(document.cookie, 'bodyCoporateId')) {
        this.userId = getCookieValue(document.cookie, 'bodyCoporateId');
        return 'bodyCorporate';
    } 
    else if (getCookieValue(document.cookie, 'contractorId')) {
        this.userId = getCookieValue(document.cookie, 'contractorId');
        return 'contractor';
    }
    return null;
 }
 private sortTimeline(notifications: Notification[])
 {
    if(notifications.length <= 1 && notifications[0].createdAt)
    {
      const date = new Date(notifications[0].createdAt[0], notifications[0].createdAt[1] -1, notifications[0].createdAt[2], notifications[0].createdAt[3], notifications[0].createdAt[4], notifications[0].createdAt[5]);
      notifications[0].createdAtDate = date;
      return notifications;
    }
    
    const sorted = [...notifications].sort((a, b) => {
      if(!a.createdAt || !b.createdAt){
        return 0;
      } 
  
      const aDate = new Date(a.createdAt[0], a.createdAt[1] -1, a.createdAt[2], a.createdAt[3], a.createdAt[4], a.createdAt[5]);
      const bDate = new Date(b.createdAt[0], b.createdAt[1] -1, b.createdAt[2], b.createdAt[3], b.createdAt[4], b.createdAt[5]);
  
      a.createdAtDate = aDate;
      b.createdAtDate = bDate;
  
      return bDate.getTime() - aDate.getTime();
    });
    return sorted;
 }
}