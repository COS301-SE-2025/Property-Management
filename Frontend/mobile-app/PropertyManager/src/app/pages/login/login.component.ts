import { Component, inject } from '@angular/core';
import { IonInput, IonItem, IonInputPasswordToggle} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthMobileService } from 'shared';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, IonInput, IonItem, IonInputPasswordToggle],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent{
  public email = "";
  public password = "";
  public loading = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;
  public passwordLimit = false;

  private authService = inject(AuthMobileService);
  private router = inject(Router);

  constructor() { }

  async login(): Promise<void>
  {
    if(this.email.length === 0 || this.password.length === 0)
    {
      this.emptyField = true;
      return;
    }

    this.loading = true;
    this.emptyField = false;
    this.userError = false;
    this.serverError = false;
    this.passwordLimit = false;

    try {
      const result = await this.authService.login(this.email, this.password);

      switch (result.userType) {
        case 'contractor':
          this.router.navigate(['/contractor-home']);
          break;
        case 'trustee':
          this.router.navigate(['/home']);
          break;
      }

    } catch (error: any) {
      if (error.status === 401) {
        this.userError = true;
      } else {
        this.serverError = true;
      }
    } finally {
      this.loading = false;
    }

    // try {
    //   const trustee = await this.authService.login(this.email, this.password);
    //   if (trustee) {
    //     this.router.navigate(['/home']);
    //     return;
    //   }
    // } catch (err) {
    //   console.warn('Trustee login failed, trying Contractor...', err);
    //   if (err instanceof HttpErrorResponse && !err.error) {
    //     this.serverError = true;
    //     this.loading = false;
    //   }
    // }

    // try {
    //   console.log('Trying contractor login...');
    //   const contractor = await this.authService.contractorLogin(this.email, this.password);
    //   if (contractor) {
    //     this.router.navigate(['/contractor-home']);
    //     return;
    //   }
    // } catch (err) {
    //   console.warn('Contractor login failed:', err);
    //   if (err instanceof HttpErrorResponse && !err.error) {
    //     this.serverError = true;
    //   } else if (err instanceof HttpErrorResponse && err.error?.error?.includes('Password attempts exceeded')) {
    //     this.passwordLimit = true;
    //   } else {
    //     this.userError = true;
    //   }
    // } finally {
    //   this.loading = false;
    // }
  }
}
