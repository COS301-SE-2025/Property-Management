import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

  public selectedUserType = 'bodyCorporate'; // defualt change after login

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
      const bodyCorpTokens = await this.authService.bodyCoporateLogin(this.email, this.password);
      localStorage.setItem('userType', 'bodyCorporate');
      console.log('Body Corporate logged in:', bodyCorpTokens);
      this.router.navigate(['/home']);
      return;
    } catch (error) {
      console.warn('Body Corporate login failed, trying Trustee...', error);
    }

    try {
      const trusteeTokens = await this.authService.trusteeLogin(this.email, this.password);
      localStorage.setItem('userType', 'trustee');
      console.log('Trustee logged in:', trusteeTokens);
      this.router.navigate(['/trusteeHome']);
      return; 
    } catch (error) {
      console.warn('Trustee login failed, trying Contractor...',error);
    }

    try {
      const contractorTokens = await this.authService.contractorLogin(this.email, this.password);
      localStorage.setItem('userType', 'contractor');
      console.log('Contractor logged in:', contractorTokens);
      this.router.navigate(['/contractorHome']);
      return;
    } catch (error) {
      console.warn('Contractor login failed:', error);
    }

    //all failed
    this.userError = true;

  }
}
