import { Injectable, signal, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationDrawerService {
  public drawerVisible = signal<boolean>(false);
  public notificationRead = new EventEmitter<void>();

  toggleDrawer() {
    this.drawerVisible.set(!this.drawerVisible());
  }

  closeDrawer() {
    this.drawerVisible.set(false);
  }
}