
import { Component } from '@angular/core';
import { IonApp} from '@ionic/angular/standalone';
import { IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ``,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [];
  public labels = [];
  constructor() {
  }
}
