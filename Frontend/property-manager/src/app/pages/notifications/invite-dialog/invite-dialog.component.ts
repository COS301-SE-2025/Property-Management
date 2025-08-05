import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { PropertyService } from 'shared';
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
    private messageService: MessageService
  ) {}

  onJoin() {
      if (!this.inviteId) return;
      this.propertyService.updateInviteStatus(this.inviteId, 'ACCEPTED').subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Invite Accepted',
            detail: 'You have joined the body corporate.'
          });
          this.display = false;
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
