import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-resetpage',
    imports: [CardModule, ButtonModule, RouterLink, HeaderComponent, DividerModule, FormsModule],
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
