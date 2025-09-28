import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonItem, IonIcon, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { StorageService } from 'shared';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline,documentTextOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonIcon, IonItem, IonButton, TabComponent, IonContent, IonList, IonSelect, IonSelectOption,RouterModule,HeaderComponent
  ],
  templateUrl: './profile.component.html',
  styles: `
    ion-select{
      color: rgb(229 231 235 / var(--tw-text-opacity, 1));
    }
  `,
})
export class ProfileComponent implements OnInit {
  public darkMode = false;
  public fontSize: string = 'normal'; // 'normal', 'large', 'small'
   public userType: string | null= '';

  constructor(
    private storage: StorageService,
    private router: Router,
    private theme: ThemeService
  ) {
    addIcons({ moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline,documentTextOutline });
  }

  async ngOnInit(): Promise<void> {
    this.theme.darkMode$.subscribe(mode => {
      this.darkMode = mode;
      this.applyTheme();
    });

    this.storage.get('fontSize').then(font => {
      this.fontSize = font || 'normal';
      this.applyFontSize();

      
    });
      this.userType = await this.storage.get('userType') || '';
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
    let base = '1rem', heading = '2rem', subheading = '1.25rem', text = '1rem';
    if (this.fontSize === 'large') {
      base = '1.25rem'; heading = '2.5rem'; subheading = '1.5rem'; text = '1.25rem';
    } else if (this.fontSize === 'small') {
      base = '0.85rem'; heading = '1.5rem'; subheading = '1rem'; text = '0.85rem';
    }
    const root = document.documentElement;
    root.style.setProperty('--base-font-size', base);
    root.style.setProperty('--heading-font-size', heading);
    root.style.setProperty('--subheading-font-size', subheading);
    root.style.setProperty('--text-font-size', text);
  }

  async signOut(): Promise<void> {
    await this.storage.clear();
    await this.storage.set('theme', this.darkMode ? 'dark' : 'light');
    await this.storage.set('fontSize', this.fontSize);
    this.router.navigate(['/login']);
  }
}