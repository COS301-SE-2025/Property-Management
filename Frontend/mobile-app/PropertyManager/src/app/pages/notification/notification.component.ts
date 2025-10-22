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
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: `
    :host ::ng-deep .p-timeline-left .p-timeline-event-opposite {
      display: none; 
    } 
  `,
  imports: [IonContent, HeaderComponent, TabComponent, FormatTimePipe, TimelineModule, CommonModule, InviteModalComponent, ProgressSpinnerModule],
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
  loading = true;
  
  constructor(private router: Router, private notificationService: NotificationsApiService, private storage: StorageService) { }

  async ngOnInit() {
    this.loading = true;
    this.loadTimeline();

    const start = Date.now();
    while(this.timeline().length === 0 && Date.now() - start < 2000)
    {
      await new Promise(res => setTimeout(res, 100));
    }

    await new Promise(res => setTimeout(res, 2000)); 
    this.loading = false;
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
  if (!notifications || notifications.length === 0) {
    return [];
  }

  if (notifications.length === 1 && notifications[0] && notifications[0].createdAt) {
    notifications[0].createdAtDate = new Date(notifications[0].createdAt);
    return notifications;
  }

  notifications.forEach(n => {
    if (n.createdAt) {
      n.createdAtDate = new Date(n.createdAt);
    }
  });

  return notifications.sort((a, b) => b.createdAtDate!.getTime() - a.createdAtDate!.getTime());
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
