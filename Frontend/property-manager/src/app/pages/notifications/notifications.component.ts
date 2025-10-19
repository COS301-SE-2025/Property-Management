import { Component, OnInit, signal, effect } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getCookieValue, NotificationsApiService, Notification, FormatTimePipe } from 'shared';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { InventoryApprovalDialogComponent} from './inventory-approval-dialog/inventory-approval-dialog.component';
import { MessageService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { NotificationDrawerService } from '../../../../../library/projects/shared/src/services/notification-drawer.service';

@Component({
  selector: 'app-notifications',
  imports: [ 
    TimelineModule, 
    DrawerModule, 
    CommonModule, 
    FormatTimePipe, 
    InviteDialogComponent,
    InventoryApprovalDialogComponent
  ],
  templateUrl: './notifications.component.html',
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
  
  public inventoryApprovalVisible = false;
  public inventoryRequestData: any = null;

  constructor(
    private router: Router,
    private notificationService: NotificationsApiService,
    private messageService: MessageService,
    public drawerService: NotificationDrawerService 
  ) {
    this.drawerService.fetchNotifications.subscribe(() => {
      this.loadTimeline();
    });
    this.drawerService.notificationRead.subscribe(() => {
      this.loadTimeline();
    });

    effect(() => {
      if (this.drawerService.drawerVisible()) {
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
      
      if(type === 'bodyCorporate') {
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
    this.notificationService.markNotificationsAsRead(noti.notificationUuid!).subscribe({
      next: () => {
        this.drawerService.notificationRead.emit();

        if (noti.notificationType === 'INVENTORY_REQUEST' && this.getUserType() === 'trustee') {
          try {
            this.inventoryRequestData = JSON.parse(noti.message);
            this.inventoryApprovalVisible = true;
          } catch (e) {

            this.messageService.add({
              severity: 'info',
              summary: 'Inventory Request',
              detail: noti.message
            });
          }
        }
        else if (noti.relatedInviteUuid && this.getUserType() === 'trustee') {
          // Check if invite is pending before showing dialog
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
              })
          }
          });
        }
        else if (noti.relatedTaskUuid) {
          if (this.getUserType() === 'trustee' || this.getUserType() === 'bodyCorporate') {
            this.router.navigate(['/taskDetails', noti.relatedTaskUuid]);
          }
        }
        else if(noti.relatedSessionUuid)
        {
          if (this.getUserType() === 'trustee' || this.getUserType() === 'bodyCorporate') {
            this.router.navigate(['/voting', noti.relatedSessionUuid]);
          }
        }
        else{
          window.location.reload();
        }
      }
    });
  }

  onInventoryRequestProcessed() {
    this.loadTimeline(); 
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
    else if(notifications.length === 1)
    {
      if (notifications[0].createdAt) {
        notifications[0].createdAtDate = new Date(notifications[0].createdAt);
      }
      return notifications;
    }

    notifications.forEach(n => {
      if (n.createdAt) {
        n.createdAtDate = new Date(n.createdAt);
      }
    });

    return notifications.sort((a, b) => b.createdAtDate!.getTime() - a.createdAtDate!.getTime());
  }
}