
import { Component, OnInit } from '@angular/core';
import { IonApp} from '@ionic/angular/standalone';
import { IonRouterOutlet } from "@ionic/angular/standalone";
import { ThemeService } from './services/theme.service';
import { StorageService } from 'shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ``,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  public appPages = [];
  public labels = [];
  constructor(private theme: ThemeService, private storage: StorageService) {
  }

  async ngOnInit() {
      await this.theme.initTheme();

    const fontSize = await this.storage.get('fontSize') || 'normal';
    let base = '1rem', heading = '2rem', subheading = '1.25rem', text = '1rem';
    if (fontSize === 'large') {
      base = '1.25rem'; heading = '2.5rem'; subheading = '1.5rem'; text = '1.25rem';
    } else if (fontSize === 'small') {
      base = '0.85rem'; heading = '1.5rem'; subheading = '1rem'; text = '0.85rem';
    }
    const root = document.documentElement;
    root.style.setProperty('--base-font-size', base);
    root.style.setProperty('--heading-font-size', heading);
    root.style.setProperty('--subheading-font-size', subheading);
    root.style.setProperty('--text-font-size', text);
  }
}
