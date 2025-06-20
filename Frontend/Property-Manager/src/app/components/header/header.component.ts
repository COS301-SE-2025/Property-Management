import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styles: ''
})
export class HeaderComponent {

  public dropDownOpen = false;

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
