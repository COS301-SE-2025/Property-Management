import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonItem, IonIcon, IonList, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    IonIcon, IonItem, IonButton, IonLabel, HeaderComponent, TabComponent, IonContent, IonList, IonSelect, IonSelectOption
  ],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent  implements OnInit {
  public darkMode = false;
  public fontSize: string = 'normal'; // 'normal', 'large', 'small'

  constructor(private storage: StorageService, private router: Router) {
    addIcons({ moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline})
  }

  async ngOnInit() {
    const theme = await this.storage.get('theme');
    if (!theme) {
      await this.storage.set('theme', 'light');
      this.darkMode = false;
    } else {
      this.darkMode = theme === 'dark';
    }
    this.applyTheme();

    const font = await this.storage.get('fontSize');
    this.fontSize = font || 'normal';
    this.applyFontSize();
  }

  async changeTheme(theme: string) {
    this.darkMode = theme === 'dark';
    await this.storage.set('theme', theme);
    this.applyTheme();
  }

applyTheme() {
  const root = document.documentElement;
  const body = document.body;
  if (this.darkMode) {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
  } else {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
  }
}

  async changeFontSize(size: string) {
    this.fontSize = size;
    await this.storage.set('fontSize', size);
    this.applyFontSize();
  }

applyFontSize() {
  const root = document.documentElement;
  const body = document.body;
  root.classList.remove('font-normal', 'font-large', 'font-small');
  root.classList.add(`font-${this.fontSize}`);
  body.classList.remove('font-normal', 'font-large', 'font-small');
  body.classList.add(`font-${this.fontSize}`);
}

  async signOut() {
    await this.storage.clear();
    this.darkMode ? await this.storage.set('theme', 'dark') : await this.storage.set('theme', 'light');
    await this.storage.set('fontSize', this.fontSize);
    this.router.navigate(['/login']);
  }
}
