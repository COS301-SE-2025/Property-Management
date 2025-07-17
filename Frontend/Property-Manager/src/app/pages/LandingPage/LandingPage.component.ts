import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';


@Component({
    selector: 'app-landing-page',
    imports: [ ButtonModule, CommonModule, RouterLink ],
    standalone: true,
    templateUrl: `./Landingpage.component.html`,
    styles: ``,
     animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
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
