import { Component } from '@angular/core';
import { IonContent, IonDatetime, PopoverController } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-popover',
  templateUrl: './date-popover.component.html',
  styles: ``,
  imports: [IonContent, IonDatetime, FormsModule]
})
export class DatePopoverComponent {
  expirationDate!: string;

  constructor(private popoverCtrl: PopoverController){}

  onDateChange(event: any)
  {
    const selectedDate = event.detail.value;
    this.popoverCtrl.dismiss(selectedDate);
  }
}
