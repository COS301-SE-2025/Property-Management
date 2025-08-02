import { Component, OnInit,inject } from '@angular/core';
import { IonTabBar, IonTabButton, IonIcon, IonTabs } from '@ionic/angular/standalone'
import { ApiService } from 'shared';
import { NgIf } from '@angular/common';
import { StorageService } from 'shared';

@Component({
  selector: 'app-tab',
  imports: [IonTabBar, IonTabButton, IonIcon, IonTabs, NgIf],
  templateUrl: './tab.component.html',
  styles: ``,
})
export class TabComponent implements OnInit {
  public darkMode = false;

  constructor(private storage: StorageService){
     this.type = this.api.getCookieValue('userType') || '';
  }
  private api = inject(ApiService);
  type: string ="";
  
  
  async ngOnInit()
  {
    const theme = await this.storage.get('theme');
    this.darkMode = theme === 'dark';
  }
}
