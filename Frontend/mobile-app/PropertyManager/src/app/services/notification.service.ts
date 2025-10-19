import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  async requestPermissions() {
    const result = await LocalNotifications.requestPermissions();
    if (result.display === 'granted') {
      //console.log('Permission granted');
    } else {
      //console.log('Permission denied');
    }
  }
  async scheduleNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Hello!',
          body: 'This is your local notification',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  }
  
}
