import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { DialogComponent } from 'property-manager/src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-invite-dialog',
  imports: [Toast, ConfirmDialogModule],
  templateUrl: './invite-dialog.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService]

})
export class InviteDialogComponent {

  @Input() display = false;
  @Input() inviteId = '';
  
  constructor(private confirmService: ConfirmationService) {}

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

  onJoin()
  {
    this.display = false;
  }
  onDisapprove()
  {
    this.display = false;
  }
}
