import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <div class = "flex flex-col">
      <!-- Name -->
      <div class = "flex flex-row justify-between items-center px-4 py-2"> 
        <p class = "font-medium italic text-xl">Property manager</p>

        <div class = "flex flex-row items-center">
          <div class = "relative">
            <button class = "cursor-pointer pr-3"> 
              <img src= "assets/icons/settings.svg" class="w-9 h-9"> 
            </button>
            <button class = "cursor-pointer" (click)="dropDown()">
              <img src= "assets/icons/profile.svg" class="w-9 h-9">
            </button>

            <div *ngIf="dropDownOpen" class= "absolute right-1 top-14 bg-white border rounded shadow-md w-22 z-50">
              <button (click)="signOut()" class= "block text-red-500 w-full text-left px-3 py-1 hover:bg-gray-100 cursor-pointer">
                Sign out
              </button>            
            </div>
          </div>
        </div>
      </div>

      <!-- bar -->
      <div class = "propertyYellow-bg h-4 w-full"></div>
    </div>
  `,
  styles: ''
})
export class HeaderComponent {

  public dropDownOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  dropDown()
  {
    this.dropDownOpen = !this.dropDownOpen;
  }

  signOut()
  {
    this.dropDownOpen = false;
    if(this.authService.logout())
    {
      this.router.navigate(['/login']);
    }
    else
    {
      console.error("couldnt log out");
    } 
  }
}
