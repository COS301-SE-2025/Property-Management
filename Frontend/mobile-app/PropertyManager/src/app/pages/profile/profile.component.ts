import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonItem, IonIcon, IonList, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonIcon, IonItem, IonButton, IonLabel, HeaderComponent, TabComponent, IonContent, IonList, IonSelect, IonSelectOption
  ],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent implements OnInit {
  public darkMode = false;
  public fontSize: string = 'normal'; // 'normal', 'large', 'small'

  constructor(
    private storage: StorageService,
    private router: Router,
    private theme: ThemeService
  ) {
    addIcons({ moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline });
  }

  ngOnInit(): void {
    this.theme.darkMode$.subscribe(mode => {
      this.darkMode = mode;
      this.applyTheme();
    });

    this.storage.get('fontSize').then(font => {
      this.fontSize = font || 'normal';
      this.applyFontSize();
    });
  }

  changeTheme(): void {
    this.theme.toggleTheme();
    // ThemeService should emit the new value, triggering applyTheme via subscription
  }

  applyTheme(): void {
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

  async changeFontSize(size: string): Promise<void> {
    this.fontSize = size;
    await this.storage.set('fontSize', size);
    this.applyFontSize();
  }

  applyFontSize(): void {
    const root = document.documentElement;
    const body = document.body;
    root.classList.remove('font-normal', 'font-large', 'font-small');
    root.classList.add(`font-${this.fontSize}`);
    body.classList.remove('font-normal', 'font-large', 'font-small');
    body.classList.add(`font-${this.fontSize}`);
  }

  async signOut(): Promise<void> {
    await this.storage.clear();
    await this.storage.set('theme', this.darkMode ? 'dark' : 'light');
    await this.storage.set('fontSize', this.fontSize);
    this.router.navigate(['/login']);
  }
}