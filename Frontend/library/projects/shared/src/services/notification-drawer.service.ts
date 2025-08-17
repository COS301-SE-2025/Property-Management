import { Injectable, signal, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationDrawerService {
  public drawerVisible = signal<boolean>(false);
  public notificationRead = new EventEmitter<void>();
  public fetchNotifications = new EventEmitter<void>();

  toggleDrawer() {
    this.drawerVisible.set(!this.drawerVisible());
  }

  closeDrawer() {
    this.drawerVisible.set(false);
  }

  triggerFetch() {
    //console.log('triggerFetch: Emitting fetchNotifications event');
    this.fetchNotifications.emit();
  }
}