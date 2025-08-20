import { Component, OnInit, signal, DestroyRef, effect, inject } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getCookieValue, NotificationsApiService, Notification, FormatTimePipe } from 'shared';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { MessageService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { NotificationDrawerService } from '../../../../../library/projects/shared/src/services/notification-drawer.service';

@Component({
  selector: 'app-notifications',
  imports: [ TimelineModule, DrawerModule, CommonModule, FormatTimePipe, InviteDialogComponent],
  templateUrl: './notifications.component.html',
  styles: `
    ::ng-deep .p-timeline-left .p-timeline-event-opposite {
      display: none !important;
    }
    ::ng-deep .p-drawer {
      width: 20rem;
      max-width: 90vw;
      background-color: var(--dialog-bg);
      color: var(--dialog-content-text);
    }
    @media (min-width: 640px) {
      ::ng-deep .p-drawer {
        width: 24rem;
      }
    }
  `,
  providers: [MessageService],
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
  ],
  standalone: true
})
export class NotificationsComponent implements OnInit {

  public unreadTimeline = signal<Notification[]>([]);
  public timeline = signal<Notification[]>([]);
  private userId: string | null = null;
  public notiError = false;
  public inviteId = signal<string | null>(null);
  public inviteDialogVisible = false;

  constructor(
    private router: Router,
    private notificationService: NotificationsApiService,
    private messageService: MessageService,
    public drawerService: NotificationDrawerService 
  ) {
    this.drawerService.fetchNotifications.subscribe(() => {
      //console.log('fetchNotifications event received, calling loadTimeline');
      this.loadTimeline();
    });
    this.drawerService.notificationRead.subscribe(() => {
      //console.log('notificationRead event received, calling loadTimeline');
      this.loadTimeline();
    });


    effect(() => {
      if (this.drawerService.drawerVisible()) {
        //console.log('Effect triggered: Drawer is visible, calling loadTimeline');
        this.loadTimeline();
      }
    });
  }

  ngOnInit() {
    this.loadTimeline();
  }

  loadTimeline() {
    let type = this.getUserType();
    if (this.userId && type) {
      
      if(type === 'bodyCorporate')
      {
        type = 'bodycoporate';
      }
      this.notificationService.getNotifications(type, this.userId).subscribe({
        next: (noti) => {
          const unread: Notification[] = [];
          const read: Notification[] = [];

          noti.forEach(n => {
            if (n.isRead) {
              read.push(n);
            } else {
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

  showDetails(noti: Notification) {
    // Mark as read
    this.notificationService.markNotificationsAsRead(noti.notificationUuid!).subscribe({
      next: () => {
        this.drawerService.notificationRead.emit();

        if (noti.relatedInviteUuid && this.getUserType() === 'trustee') {
          this.notificationService.getInviteById(noti.relatedInviteUuid).subscribe({
            next: (invite) => {
              if (invite.status === 'PENDING') {
                this.inviteId.set(noti.relatedInviteUuid ?? null);
                this.inviteDialogVisible = true;
              }
            },
            error: (err) => {
              console.error(err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to display invite.'
              });
            }
          });
        }
        else if (noti.relatedTaskUuid) {
          if (this.getUserType() === 'trustee' || this.getUserType() === 'bodyCorporate') {
            this.router.navigate(['/taskDetails', noti.relatedTaskUuid]);
            this.drawerService.closeDrawer();
          }
        }
        else if (noti.relatedSessionUuid) {
          if (this.getUserType() === 'trustee' || this.getUserType() === 'bodyCorporate') {
            this.router.navigate(['/voting', noti.relatedSessionUuid]);
            this.drawerService.closeDrawer();
          }
        }
        else if (noti.relatedQuoteUuid) {
          // Contractor can see their quote they made
        }
        else {
          window.location.reload();
        }
      }
    });
  }

  private getUserType(): string | null {
    if (getCookieValue(document.cookie, 'trusteeId')) {
      this.userId = getCookieValue(document.cookie, 'trusteeId');
      return 'trustee';
    } else if (getCookieValue(document.cookie, 'bodyCoporateId')) {
      this.userId = getCookieValue(document.cookie, 'bodyCoporateId');
      return 'bodyCorporate';
    } else if (getCookieValue(document.cookie, 'contractorId')) {
      this.userId = getCookieValue(document.cookie, 'contractorId');
      return 'contractor';
    }
    return null;
  }

  private sortTimeline(notifications: Notification[]) {
    if (!notifications || notifications.length === 0) {
      return [];
    }

    if (notifications.length === 1 && notifications[0] && notifications[0].createdAt) {
      const date = new Date(
        notifications[0].createdAt[0],
        notifications[0].createdAt[1] - 1,
        notifications[0].createdAt[2],
        notifications[0].createdAt[3],
        notifications[0].createdAt[4],
        notifications[0].createdAt[5]
      );
      notifications[0].createdAtDate = date;
      return notifications;
    }

    const valid = notifications.filter(n => n && Array.isArray(n.createdAt));
    valid.forEach(n => {
      if (n.createdAt) {
        n.createdAtDate = new Date(
          n.createdAt[0],
          n.createdAt[1] - 1,
          n.createdAt[2],
          n.createdAt[3],
          n.createdAt[4],
          n.createdAt[5]
        );
      }
    });

    return valid.sort((a, b) => b.createdAtDate!.getTime() - a.createdAtDate!.getTime());
  }
}
