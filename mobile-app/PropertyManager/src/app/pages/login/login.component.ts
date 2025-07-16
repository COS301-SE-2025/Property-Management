import { Component, inject } from '@angular/core';
import { IonInput, IonItem} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, IonInput, IonItem],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent{
  public email = "";
  public password = "";
  public passwordVisible = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  togglePassword()
  {
    this.passwordVisible = !this.passwordVisible;
  }
  async login(): Promise<void>
  {
    if(this.email.length === 0 || this.password.length === 0)
    {
      this.emptyField = true;
      return;
    }

    this.emptyField = false;
    this.userError = false;
    this.serverError = false;

    try{
      await this.authService.trusteeLogin(this.email, this.password);
      this.router.navigate(['/home']);
      return;
    }
    catch(err){
      console.warn('Trustee login failed', err);
    }

    try{
      await this.authService.contractorLogin(this.email, this.password);
      this.router.navigate(['/contractor']);
      return;
    }
    catch(err){
      console.warn('Contractor login failed', err);
    }

    this.userError = true;
  }
}
