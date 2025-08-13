import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseIcon } from "primeng/icons/baseicon";

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule, BaseIcon],
  templateUrl: './login.component.html',
  styles: ``,
})

export class LoginComponent {
  public email = "";
  public password = "";
  public passwordVisible = false;
  public loading = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;
  public passwordLimit = false;

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

    this.loading = true;
    this.emptyField = false;
    this.userError = false;
    this.serverError = false;
    this.passwordLimit = false;

    try {
      await this.authService.bodyCoporateLogin(this.email, this.password);
      this.router.navigate(['/bodyCoporate']);
      return;
    } catch (error) {
      console.warn('Body Corporate login failed, trying Trustee...', error);

      if(error instanceof HttpErrorResponse && !error.error)
      {
        this.serverError = true;
        return;
      }
    }

    try {
      await this.authService.trusteeLogin(this.email, this.password);
      this.router.navigate(['/home']);
      return; 
    } catch (error) {
      console.warn('Trustee login failed, trying Contractor...', error);

      if(error instanceof HttpErrorResponse && !error.error)
      {
        this.serverError = true;
        return;
      }
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

      if(error instanceof HttpErrorResponse && !error.error)
      {
        this.serverError = true;
      }
      else if(error instanceof HttpErrorResponse && error.error.error.includes('Password attempts exceeded'))
      {
        this.passwordLimit = true;
      }
      else
      {
        this.userError = true;
      }
    }
    finally{
      this.loading = false;
    }
  }
}