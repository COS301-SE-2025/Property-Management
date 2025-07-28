import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = new BehaviorSubject<boolean>(false);

  constructor(private storage: StorageService) { }

  async initTheme()
  {
    const theme = await this.storage.get('theme') || 'light';
    this.darkMode.next(theme === 'dark');
    this.apply()
  }
  async toggleTheme(){
    const mode = !this.darkMode.value;
    this.darkMode.next(mode);
    await this.storage.set('theme', this.darkMode.value ? 'dark' : 'light');
    this.apply();
  }
  private apply()
  {
    document.documentElement.classList.toggle('dark', this.darkMode.value);
  }
  get darkMode$(){
    return this.darkMode.asObservable();
  }
  get currentMode() {
    return this.darkMode.value;
  }
}
