import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styles: ``,
})

export class LoginComponent {
  public email = "";
  public password = "";
  public passwordVisible = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;

  public selectedUserType = 'bodyCorporate';

  constructor(private authService: AuthService, private router: Router){}

  togglePassword()
  {
    this.passwordVisible = !this.passwordVisible;
  }

  async login(): Promise<void> {
    if (this.email.length === 0 || this.password.length === 0) {
      this.emptyField = true;
      return;
    }

    this.emptyField = false;
    this.userError = false;
    this.serverError = false;

    try {
      await this.authService.bodyCoporateLogin(this.email, this.password);
      this.router.navigate(['/bodyCoporate']);
      return;
    } catch (error) {
      console.warn('Body Corporate login failed, trying Trustee...', error);
    }

    try {
      await this.authService.trusteeLogin(this.email, this.password);
      this.router.navigate(['/home']);
      return; 
    } catch (error) {
      console.warn('Trustee login failed, trying Contractor...', error);
    }

    try {
      await this.authService.contractorLogin(this.email, this.password);

      // contractorProfileComplete is still checked in localStorage, 
      // but userType is now determined from the Cognito token
      const profileComplete = localStorage.getItem('contractorProfileComplete');
      if (profileComplete === 'true') {
        this.router.navigate(['/contractorHome']);
      } else {
        this.router.navigate(['/contractor-prof']);
      }
      return;
    } catch (error) {
      console.warn('Contractor login failed:', error);
    }

    this.userError = true;
  }
}