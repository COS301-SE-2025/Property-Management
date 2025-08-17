import { Component } from '@angular/core';
import { IonMenu, IonContent, IonList, IonItem, IonIcon, IonMenuToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [IonMenu, IonContent, IonList, IonItem, IonIcon, IonMenuToggle],
  templateUrl: './drawer.component.html',
  styleUrls: ['drawer.component.scss']
})
export class DrawerComponent {}