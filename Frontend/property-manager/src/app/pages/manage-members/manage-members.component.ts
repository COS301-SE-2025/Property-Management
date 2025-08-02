import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './manage-members.component.html'
})
export class ManageMembersComponent {
  invitations = [
    { name: 'Tafara', email: 'trustee@gmail.com', dateSent: new Date('2025-07-12'), status: 'Pending' },
    { name: 'Patrick', email: 'trustee@gmail.com', dateSent: new Date('2025-06-26'), status: 'Accepted' },
    { name: 'Thabiso', email: 'trustee@gmail.com', dateSent: new Date('2025-07-05'), status: 'Rejected' }
  ];

  activeMembers = [
    { name: 'Patrick', email: 'patrick@gmail.com', role: 'Trustee', since: new Date('2025-06-26') },
    { name: 'Neil', email: 'neil@gmail.com', role: 'Trustee', since: new Date('2025-07-07') }
  ];

  cancelInvite(invite: any) {

  }

  revokeInvite(invite: any) {

  }
}