import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';

@Component({
    selector: 'app-landing-page',
    imports: [ ButtonModule, HeaderComponent, CommonModule, RouterLink ],
    standalone: true,
    templateUrl: `./Landingpage.component.html`,
    styles: ``,
})

export class LandingPageComponent  {
   
  public dropDownOpen = false;

  constructor(private authService: AuthService, private router: Router){}

  dropDown()
  {
    this.dropDownOpen = !this.dropDownOpen;
  }

  signOut()
  {
    // this.dropDownOpen = false;
    // if(this.authService.logout())
    // {
    //   this.router.navigate(['/login']);
    // }
    // else
    // {
    //   console.error("couldnt log out");
    // } 
  }
}
