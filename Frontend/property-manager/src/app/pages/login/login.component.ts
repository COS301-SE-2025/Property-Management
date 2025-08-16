import { Component } from '@angular/core';
import { AuthService, ContractorApiService, getCookieValue } from 'shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  public loading = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;
  public passwordLimit = false;

  public selectedUserType = 'bodyCorporate';

  constructor(private authService: AuthService, private router: Router, private contractorService: ContractorApiService){}

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
      const contractorId = getCookieValue(document.cookie, 'contractorId');

      this.contractorService.getContractorById(contractorId!).subscribe({
        next: (res) => {
          if(res.status)
          {
            this.router.navigate(['/contractorHome']);
            return;
          }
          else
          {
            this.router.navigate(['/contractor-prof']);
            return;
          }
        }
      });
      this.router.navigate(['/contractor-prof']);
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