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

  public verificationCode = '';
  public username = '';
  public userType = '';

  public emptyField = false;
  public errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    const storedUsername = sessionStorage.getItem('pendingUsername');
    const storedUserType = sessionStorage.getItem('userType');
    
    if (storedUsername) {
        this.username = storedUsername;
      }else {
        console.error('No username found for verification.');
        this.router.navigate(['']);
      }
    

   if (storedUserType) {
        this.userType = storedUserType;
      } else {
        console.error('No user type found.');
        this.router.navigate(['/register-body-corporate']);
      }
  }

  async sendCode(): Promise<void> {
    if(!this.verificationCode) {
      this.emptyField = true;
      return;
    }

    this.emptyField = false;
    this.errorMessage = '';

    try {
      if(this.userType === 'bodyCorporate') {
        const result = await this.authService.confirmBodyCoporateRegistration(this.username, this.verificationCode);
        console.log('Email verification successful:', result);
      }else if(this.userType === 'trustee') {
        const result = await this.authService.confirmTrusteeRegistration(this.username, this.verificationCode);
        console.log('Email verification successful:', result);
      } else if(this.userType === 'contractor') {
        const result = await this.authService.confirmContractorRegistration(this.username, this.verificationCode);
        console.log('Email verification successful:', result);
      }else {
        console.error('Unknown user type:', this.userType);
        this.errorMessage = 'Invalid user type. Please register again.';
        return;
      }

      sessionStorage.removeItem('pendingUsername');
      sessionStorage.removeItem('userType');
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Verification failed:', error);
      this.errorMessage = 'Verification failed. Please check your code and try again.';
    }
  }
}
