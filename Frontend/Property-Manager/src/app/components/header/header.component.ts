import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: `./header.component.html`,
  styles: ''
})
export class HeaderComponent {

  public dropDownProfileOpen = false;
  public dropDownSettingsOpen = false;
  public isDarkMode = false;

  constructor(private authService: AuthService, private router: Router){
    const saved = localStorage.getItem('darkMode');
    if(saved !== null)
    {
      this.isDarkMode = saved === 'true';
    }
    else
    {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log(this.isDarkMode);
    }
    this.applyDarkMode();
  }

  dropDownProfile()
  {
    this.dropDownSettingsOpen = false;
    this.dropDownProfileOpen = !this.dropDownProfileOpen;
  }
  dropDownSettings()
  {
    this.dropDownProfileOpen = false;
    this.dropDownSettingsOpen = !this.dropDownSettingsOpen;
  }

  signOut()
  {
    this.dropDownProfileOpen = false;
    this.router.navigate(['/login']);
    // if(this.authService.logout())
    // {
    // }
    // else
    // {
    //   console.error("couldnt log out");
    // } 
  }

  toggleDarkMode()
  {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();

    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
  private applyDarkMode()
  {
    console.log("Applying dark mode:", this.isDarkMode);
    const root = document.documentElement;
    if(this.isDarkMode)
    {
      root.classList.add('dark-theme');
    }
    else
    {
      root.classList.remove('dark-theme');
    }
  }
}
