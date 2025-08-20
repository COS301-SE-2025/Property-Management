import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'shared';
import { StorageService } from 'shared';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-email.component.html',
  styles: ``
})
export class VerifyEmailComponent implements OnInit{

  public verificationCode = '';
  public username = '';
  public userType = '';

  public emptyField = false;
  public errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private storage = inject(StorageService);

  constructor() {}

  async ngOnInit() {
    const storedUsername = await this.storage.get('pendingUsername');
    const storedUserType = await this.storage.get('userType');

    if(storedUsername && storedUserType){
      this.username = storedUsername;
      this.userType = storedUserType;
    }
    else{
      console.error('No username or user type found for verification.');
      this.router.navigate(['']);
    }
  }

  async sendCode(): Promise<void>{
    if(!this.verificationCode){
      this.emptyField = true;
      return;
    }

    this.emptyField = false;
    this.errorMessage = '';

    try {

      if(this.userType === 'trustee') {
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

      this.storage.remove('pendingUsername');
      this.storage.remove('userType');
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Verification failed:', error);
      this.errorMessage = 'Verification failed. Please check your code and try again.';
    }
  }
}