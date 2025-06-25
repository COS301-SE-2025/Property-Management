import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  imports: [FloatLabelModule, CommonModule, FormsModule],
  templateUrl: './verify-email.component.html',
  styles: ``
})
export class VerifyEmailComponent {

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      username: string
    };
    
    if (state) {
      this.username = state.username;
    }
  }

  public verificationCode = '';
  public username = '';

  sendCode()
  {
    console.log(this.username);
    console.log(this.verificationCode);
    if(!this.verificationCode)
    {
      return;
    }

    return this.authService.confirmRegister(this.username, this.verificationCode)
    .then(tokens => {
      console.log("Verified email");
      console.log(tokens);
  
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
