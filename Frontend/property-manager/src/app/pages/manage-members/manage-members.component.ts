import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService, InviteWithTrustee, ApiService, getCookieValue } from 'shared';
import { NotificationsApiService, Notification } from 'shared';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, Toast, FormsModule],
  providers: [MessageService],
  templateUrl: './manage-members.component.html'
})
export class ManageMembersComponent implements OnInit {
  invitations: InviteWithTrustee[] = [];
  activeMembers: InviteWithTrustee[] = [];

  trusteeEmail: string = '';
  inviteMessage: string = '';
  bodyCorporateUuid: string = '';
  showInviteModal = false;

  constructor(
    private propertyService: PropertyService,
    private notificationService: NotificationsApiService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.bodyCorporateUuid = bcId;

    this.propertyService.getInvitations().subscribe(data => {
      this.invitations = data;
      this.activeMembers = data.filter(invite => invite.status === 'ACCEPTED');
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

      const noti: Notification = {
        notificationType: 'INVITE REVOKED',
        message: `Your membership in the body corporate has been revoked.`,
        recipientType: 'trustee',
        recipientUuid: invite.trusteeUuid,
        isRead: false,
        relatedInviteUuid: invite.inviteUuid
      };
      this.notificationService.createNotifications(noti).subscribe();
    });
  }
  sendInviteToTrustee() {
    if (!this.trusteeEmail || !this.bodyCorporateUuid) {
      this.inviteMessage = 'Please enter a valid email address.';
      return;
    }

    // Basic UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(this.bodyCorporateUuid)) {
      this.inviteMessage = 'Invalid body corporate ID.';
      return;
    }

    this.apiService.getAllTrustees().subscribe({
      next: (trustees) => {
        const trustee = trustees.find(t => t.email.toLowerCase() === this.trusteeEmail.toLowerCase());
        if (!trustee) {
          this.inviteMessage = 'No trustee found with this email address.';
          return;
        }

        if (!uuidRegex.test(trustee.trusteeUuid)) {
          this.inviteMessage = 'Invalid trustee ID.';
          return;
        }

        const payload = {
          trusteeUuid: trustee.trusteeUuid,
          coporateUuid: this.bodyCorporateUuid,
          name: trustee.name || null,
          email: trustee.email || null,
          role: 'Trustee' // Match backend expectation
        };

        this.propertyService.sendInvite(payload).subscribe({
          next: () => {
            this.inviteMessage = 'Invite sent successfully!';
            this.trusteeEmail = '';
          },
          error: (error) => {
            console.error('Invite error:', error);
            const errorMessage = error.status === 404 
              ? 'Trustee or body corporate not found.' 
              : error.status === 400 
                ? 'Invalid request. Please check the email and try again.'
                : 'Failed to send invite. Please try again later.';
            this.inviteMessage = error.error?.message || errorMessage;
          }
        });
      },
      error: () => {
        this.inviteMessage = 'Error fetching trustee details.';
      }
    });
  }
}