import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  template: ``,
  styles: ``,
})
export abstract class ModalComponent{

  displayModal = false;

  @ViewChild(IonModal) modal!: IonModal;

  openModal(): void{
    this.displayModal = true;
  }
  
  confirm(): void{
    this.modal?.dismiss(null, 'confirm')
  }

  closeModal(): void{
    this.displayModal = false;
    this.modal?.dismiss(null, 'cancel');
  }
}
