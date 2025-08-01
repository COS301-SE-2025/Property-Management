import { Component, OnInit } from '@angular/core';
import { IonTabBar, IonTabButton, IonIcon, IonTabs } from '@ionic/angular/standalone'
import { StorageService } from 'shared';

@Component({
  selector: 'app-tab',
  imports: [IonTabBar, IonTabButton, IonIcon, IonTabs],
  templateUrl: './tab.component.html',
  styles: ``,
})
export class TabComponent implements OnInit {
  public darkMode = false;

  constructor(private storage: StorageService){}

  async ngOnInit()
  {
    const theme = await this.storage.get('theme');
    this.darkMode = theme === 'dark';
  }
}
