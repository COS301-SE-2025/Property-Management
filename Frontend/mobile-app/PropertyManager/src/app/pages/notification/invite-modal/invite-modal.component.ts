import { Component, Input } from '@angular/core';
import { IonButton, IonHeader, IonModal, IonToolbar, IonContent, IonTitle } from '@ionic/angular/standalone';
import { PropertyService } from 'shared'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-invite-modal',
  imports: [IonModal, IonButton, IonHeader, IonToolbar, IonContent, IonTitle],
  templateUrl: './invite-modal.component.html',
  styles: ``,
})
export class InviteModalComponent {
  @Input() display = false;
  @Input() inviteId = '';
  @Input() bodyCorporate = '';

  constructor(private propertyService: PropertyService, private toastCtrl: ToastController) {}

  async onJoin() {
    if (!this.inviteId) return;
    try {
      await this.propertyService.updateInviteStatus(this.inviteId, 'ACCEPTED').toPromise();
      this.display = false;
      this.showToast('Invite accepted. You have joined the body corporate.', 'success');
    } catch (err) {
      this.showToast('Failed to accept invite.', 'danger');
    }
  }

  async onDissaprove() {
    if (!this.inviteId) return;
    try {
      await this.propertyService.updateInviteStatus(this.inviteId, 'REJECTED').toPromise();
      this.display = false;
      this.showToast('Invite declined.', 'warning');
    } catch (err) {
      this.showToast('Failed to decline invite.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}