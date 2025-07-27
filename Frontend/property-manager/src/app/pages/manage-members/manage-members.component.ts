import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { PropertyService, InviteWithTrustee } from 'shared';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './manage-members.component.html'
})
export class ManageMembersComponent implements OnInit {
  invitations: InviteWithTrustee[] = [];
  activeMembers: InviteWithTrustee[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.getInvitations().subscribe(data => {
      this.invitations = data;
      this.activeMembers = data.filter(invite => invite.status === 'Accepted');
    });
  }

cancelInvite(invite: InviteWithTrustee) {
  this.propertyService.cancelInvite(invite.inviteUuid).subscribe(() => {
    this.invitations = this.invitations.filter(i => i.inviteUuid !== invite.inviteUuid);
    this.activeMembers = this.activeMembers.filter(i => i.inviteUuid !== invite.inviteUuid);
  });
}

revokeInvite(invite: InviteWithTrustee) {
  this.propertyService.revokeInvite(invite.inviteUuid).subscribe(updated => {
    this.invitations = this.invitations.map(i =>
      i.inviteUuid === invite.inviteUuid ? { ...i, status: 'Revoked' } : i
    );
    this.activeMembers = this.activeMembers.filter(i => i.inviteUuid !== invite.inviteUuid);
  });
}
}