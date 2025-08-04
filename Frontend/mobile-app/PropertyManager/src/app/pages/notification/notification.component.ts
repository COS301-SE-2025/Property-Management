import { Component, OnInit, signal } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "src/app/components/header/header.component";
import { TabComponent } from "src/app/components/tab/tab.component";
import { FormatTimePipe } from "../../../../../../library/projects/shared/src/pipes/format-date-time.pipe";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationsApiService, Notification, StorageService } from 'shared';
import { Router } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { InviteModalComponent } from './invite-modal/invite-modal.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: `
    :host ::ng-deep .p-timeline-left .p-timeline-event-opposite {
      display: none; 
    } 
  `,
  imports: [IonContent, HeaderComponent, TabComponent, FormatTimePipe, TimelineModule, CommonModule, InviteModalComponent],
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
  public bodyCorporateMessage = signal<string | null>(null);
  
  constructor(private router: Router, private notificationService: NotificationsApiService, private storage: StorageService) { }

  ngOnInit() {
    this.loadTimeline();
  }
  async loadTimeline()
  {
    const type = await this.getUserType();
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
  async showDetails(noti: Notification)
  {
    //Mark as read
    this.notificationService.markNotificationsAsRead(noti.notificationUuid!).subscribe({
      next: async () => {
        if(noti.relatedInviteUuid && await this.getUserType() === 'trustee')
        {
          //confirm dialog pop up
          console.log("Trying to open modal")
          this.inviteId.set(noti.relatedInviteUuid);
          this.bodyCorporateMessage.set(noti.message);
          this.inviteDialogVisible = true;
        }
        else if(noti.relatedTaskUuid)
        {
          if(await this.getUserType() === 'trustee' || await this.getUserType() === 'bodyCorporate')
          {
            this.router.navigate(['/taskDetails', noti.relatedTaskUuid]);
          }
        }
        else if(noti.relatedSessionUuid)
        {
          if(await this.getUserType() === 'trustee' || await this.getUserType() === 'bodyCorporate')
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
 private async getUserType(): Promise<string | null> {
    if (await this.storage.get('trusteeId')) {
        this.userId = await this.storage.get('trusteeId');
        return 'trustee';
    } 
    else if (await this.storage.get('bodyCoporateId')) {
        this.userId = await this.storage.get('bodyCoporateId');
        return 'bodyCorporate';
    } 
    else if (await this.storage.get('contractorId')) {
        this.userId = await this.storage.get('contractorId')
        return 'contractor';
    }
    return null;
 }
}
