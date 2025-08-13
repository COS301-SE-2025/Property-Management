import { Component } from '@angular/core';
import { IonContent, IonButton, IonItem, IonIcon, IonList } from '@ionic/angular/standalone';
import { StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-profile',
  imports: [IonIcon, IonItem, IonButton,  HeaderComponent, TabComponent, IonContent, IonList],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent {
  public darkMode = false;

  constructor(private storage: StorageService, private router: Router, private theme: ThemeService) {
    addIcons({ moonOutline, sunnyOutline, textOutline, helpOutline, logOutOutline});

    theme.darkMode$.subscribe(mode => this.darkMode = mode);
  }
  changeTheme() {
    this.theme.toggleTheme();
  }
  async signOut()
  {
    await this.storage.clear();

    this.darkMode ? await this.storage.set('theme', 'dark') : await this.storage.set('theme', 'light');

    this.router.navigate(['/login']);
  }
}
