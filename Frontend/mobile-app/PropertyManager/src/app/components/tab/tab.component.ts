import { Component,inject } from '@angular/core';
import { IonTabBar, IonTabButton, IonIcon, IonTabs } from '@ionic/angular/standalone'
import { ApiService } from 'shared';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tab',
  imports: [IonTabBar, IonTabButton, IonIcon, IonTabs, NgIf],
  templateUrl: './tab.component.html',
  styles: ``,
})
export class TabComponent {
  private api = inject(ApiService);
  type: string ="";
  constructor() {
    this.type = this.api.getCookieValue('userType') || '';
  }
}
