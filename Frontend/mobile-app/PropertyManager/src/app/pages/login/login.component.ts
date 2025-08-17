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

    try{
      const trustee = await this.authService.trusteeLogin(this.email, this.password);
      if(trustee)
      {
        this.router.navigate(['/home']);
        return;
      }
    }
    catch(err){
      console.warn('Trustee login failed', err);
    }

    try{
      await this.authService.contractorLogin(this.email, this.password);
      this.router.navigate(['/contractor-home']);
      return;
    }
    catch(err){
      console.warn('Contractor login failed', err);

      if(err instanceof HttpErrorResponse && !err.error)
      {
        this.serverError = true;
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
