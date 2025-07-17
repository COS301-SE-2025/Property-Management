import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from "src/app/components/tab/tab.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, TabComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent{

  constructor() { }

}
