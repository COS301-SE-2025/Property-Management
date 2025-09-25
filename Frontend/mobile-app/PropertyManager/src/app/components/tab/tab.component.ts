import { Component, OnInit, inject } from '@angular/core';
import { IonTabBar, IonTabButton, IonIcon, IonTabs } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { StorageService } from 'shared';
import { addIcons } from 'ionicons';
import { homeOutline, archiveOutline, notificationsOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab',
  imports: [IonTabBar, IonTabButton, IonIcon, IonTabs, NgIf],
  templateUrl: './tab.component.html',
  styles: `
    ion-tabs{
      height: [20rem];
      padding-botton: [8rem];
    }
  `,
})
export class TabComponent implements OnInit {
  public darkMode = false;
  public type: string = "";

  private storage = inject(StorageService);

  constructor(){
    addIcons({ homeOutline, archiveOutline, notificationsOutline, personOutline });
  }

  async ngOnInit() {
    this.type = await this.storage.get('userType') || '';
    const theme = await this.storage.get('theme');
    this.darkMode = theme === 'dark';
  }
}