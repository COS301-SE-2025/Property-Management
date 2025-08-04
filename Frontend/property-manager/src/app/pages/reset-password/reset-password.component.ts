import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';


import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-resetpage',
    imports: [ButtonModule, RouterLink, HeaderComponent,  FormsModule, CommonModule],
    standalone: true,
    templateUrl: `./reset-password.component.html`,
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

export class ResetPasswordComponent  {
     email = '';
  oldPassword = '';
  newPassword = '';

  resetPassword() {
    console.log(`Resetting password for ${this.email}`);
    
  }
   
}
