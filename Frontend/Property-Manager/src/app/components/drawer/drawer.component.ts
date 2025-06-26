import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule],
  templateUrl: './drawer.component.html',
  styles: ``
})
export class DrawerComponent {

  displayDrawer = false;

  openDrawer():void{
    this.displayDrawer = true;
  }

  closeDrawer(): void{
    this.displayDrawer = false;
  }
}
