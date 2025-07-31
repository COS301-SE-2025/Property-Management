import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { PropertyService, InviteWithTrustee } from 'shared';
import { AuthService } from 'shared';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './manage-members.component.html'
})
export class ManageMembersComponent implements OnInit {
  invitations: InviteWithTrustee[] = [];
  activeMembers: InviteWithTrustee[] = [];
  pendingInvites: InviteWithTrustee[] = [];
  showInviteModal = false;
  selectedInvite?: InviteWithTrustee;

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService 
  ) {}

  ngOnInit() {

    const trusteeUuid = this.authService.getCookieValue('trusteeId');
    if (!trusteeUuid) {

      return;
    }
    this.propertyService.getInvitesForTrustee(trusteeUuid).subscribe(data => {
      this.invitations = data;
      this.activeMembers = data.filter(invite => invite.status === 'ACCEPTED');
      this.pendingInvites = data.filter(invite => invite.status === 'PENDING');
      if (this.pendingInvites.length > 0) {
        this.showInviteNotification(this.pendingInvites[0]);
      }
    });
  }

  showInviteNotification(invite: InviteWithTrustee) {
    this.selectedInvite = invite;
    this.showInviteModal = true;
  }

  acceptInvite(invite: InviteWithTrustee) {
    this.propertyService.updateInviteStatus(invite.inviteUuid, 'ACCEPTED').subscribe(updated => {
      this.showInviteModal = false;
      this.ngOnInit();
    });
  }

  declineInvite(invite: InviteWithTrustee) {
    this.propertyService.updateInviteStatus(invite.inviteUuid, 'REJECTED').subscribe(updated => {
      this.showInviteModal = false;
      this.ngOnInit();
    });
  }

  cancelInvite(invite: InviteWithTrustee) {
    this.propertyService.updateInviteStatus(invite.inviteUuid, 'REJECTED').subscribe(updated => {
      this.invitations = this.invitations.map(i =>
        i.inviteUuid === invite.inviteUuid ? { ...i, status: 'REJECTED' } : i
      );
      this.activeMembers = this.activeMembers.filter(i => i.inviteUuid !== invite.inviteUuid);
    });
  }

  revokeInvite(invite: InviteWithTrustee) {
    this.propertyService.updateInviteStatus(invite.inviteUuid, 'REJECTED').subscribe(updated => {
      this.invitations = this.invitations.map(i =>
        i.inviteUuid === invite.inviteUuid ? { ...i, status: 'REJECTED' } : i
      );
      this.activeMembers = this.activeMembers.filter(i => i.inviteUuid !== invite.inviteUuid);
    });
  }
}