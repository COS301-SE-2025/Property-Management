import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-resetpage',
    imports: [ButtonModule, RouterLink, HeaderComponent,  FormsModule],
    standalone: true,
    templateUrl: `./reset-password.component.html`,
    styles: ``,
})

export class ResetPasswordComponent  {
     email = '';
  oldPassword = '';
  newPassword = '';

  resetPassword() {
    console.log(`Resetting password for ${this.email}`);
    
  }
   
}
