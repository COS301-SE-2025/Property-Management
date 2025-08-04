import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { PropertyService } from 'shared';
import { DialogComponent } from "../../../components/dialog/dialog.component";

@Component({
  selector: 'app-invite-dialog',
  imports: [Toast, ConfirmDialogModule],
  templateUrl: './invite-dialog.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService]

})
export class InviteDialogComponent implements OnInit {

  @Input() display = false;
  @Input() inviteId = '';
  
  constructor(
    private confirmService: ConfirmationService,
    private propertyService: PropertyService,
    private messageService: MessageService
  ) {}
  ngOnInit()
  {
    this.confirmService.confirm({
      message: 'Do you want to accept this invitation?',
      header: 'Confirm Invitation',
      icon: 'pi pi-megaphone',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-outlined p-button-success',
      rejectButtonStyleClass: 'p-button-outlined p-button-danger',
      accept: () => this.onJoin(),
      reject: () => this.onDisapprove()
    })
  }

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
