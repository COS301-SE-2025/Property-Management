import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { NotificationsApiService, PropertyService, Notification, getCookieValue } from 'shared';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-invite-dialog',
  imports: [Toast, DialogModule, ButtonModule],
  templateUrl: './invite-dialog.component.html',
  styles: ``,
  providers: [MessageService]

})
export class InviteDialogComponent {

  @Input() display = false;
  @Input() inviteId = '';
  
  constructor(
    private propertyService: PropertyService,
    private messageService: MessageService,
    private notificationService: NotificationsApiService
  ) {}

  onJoin() {
      if (!this.inviteId) return;
      this.propertyService.updateInviteStatus(this.inviteId, 'ACCEPTED').subscribe({
        next: () => {

          const id = getCookieValue(document.cookie, 'trusteeId');
          const noti: Notification = {
            notificationType: 'INVITE ACCEPTED',
            message: 'You accepted to join the body corporate',
            recipientType: 'trustee',
            recipientUuid: id,
            isRead: false
          };

          this.notificationService.createNotifications(noti).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Invite Accepted',
                detail: 'You have joined the body corporate.'
              });
              this.display = false;

              setTimeout(() => {
                window.location.reload();
              }, 2000);
            },
            error: () => {
               this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to accept invite.'
              });
            }
          })

        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to accept invite.'
          });
        }
      });
    }

  onDisapprove() {
      if (!this.inviteId) return;
      this.propertyService.updateInviteStatus(this.inviteId, 'REJECTED').subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Invite Declined',
            detail: 'You have declined the invitation.'
          });
          this.display = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to decline invite.'
          });
        }
      });
    }
}
