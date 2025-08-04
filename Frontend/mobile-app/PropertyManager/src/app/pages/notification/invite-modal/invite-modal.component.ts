import { Component, Input } from '@angular/core';
import { IonButton, IonHeader, IonModal, IonToolbar, IonButtons, IonContent, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-invite-modal',
  imports: [IonModal, IonButton, IonHeader, IonToolbar, IonButtons, IonContent, IonTitle],
  templateUrl: './invite-modal.component.html',
  styles: ``,
})
export class InviteModalComponent {

  @Input() display = false;
  @Input() inviteId = '';
  @Input() bodyCorporate = '';
  
  constructor() {}

  onJoin(){

  }
  onDissaprove(){
    
  }

}
