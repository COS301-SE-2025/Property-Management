
import { Component, OnInit } from '@angular/core';
import { IonApp} from '@ionic/angular/standalone';
import { IonRouterOutlet } from "@ionic/angular/standalone";
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ``,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  public appPages = [];
  public labels = [];
  constructor(private theme: ThemeService) {
  }

  async ngOnInit() {
      await this.theme.initTheme();
  }
}
