import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonItem, IonIcon, IonList } from '@ionic/angular/standalone';
import { StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [IonIcon, IonItem, IonButton,  HeaderComponent, TabComponent, IonContent, IonList],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent  implements OnInit {
  public darkMode = false;

  constructor(private storage: StorageService, private router: Router) {
    addIcons({ moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline})
  }

  async ngOnInit() {
    if(!this.storage.get('theme'))
    {
      await this.storage.set('theme', 'light');
      this.darkMode = false;
    }
    else
    {
      if(await this.storage.get('theme') === 'dark')
      {
        this.darkMode = true;
      }
    }
  }
  async changeTheme(theme: string)
  {
    this.darkMode = !this.darkMode;
    await this.storage.set('theme', theme); 
  }
  async signOut()
  {
    await this.storage.clear();

    this.darkMode ? await this.storage.set('theme', 'dark') : await this.storage.set('theme', 'light');

    this.router.navigate(['/login']);
  }
}
