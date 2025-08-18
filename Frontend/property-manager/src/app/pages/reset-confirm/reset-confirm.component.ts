import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'shared';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-confirm',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-confirm.component.html',
  styles: ``
})
export class RestConfirmComponent {

  public confirmationCode = '';
  public username = '';
  public userType = '';

  public emptyField = false;
  public errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    
  }

  async sendCode(): Promise<void> {
    if(!this.confirmationCode) {
      this.emptyField = true;
      return;
    }

    this.emptyField = false;
    this.errorMessage = '';

    try {
      
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Verification failed:', error);
      this.errorMessage = 'Verification failed. Please check your code and try again.';
    }
  }
}
