import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ApiService } from 'shared';   
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpage',
  imports: [ButtonModule, FormsModule, CommonModule],
  standalone: true,
  templateUrl: `./reset-password.component.html`,
  styles: ``,
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ResetPasswordComponent {
  email = '';
  newPassword = '';
  confirmationCode = '';
  message = '';
  step = 1; 

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  resetPassword() {
    this.apiService.resetTrusteePasswordRequest(this.email).subscribe({
      next: (res) => {
        this.message = 'Reset code sent to your email.';
        //console.log("Reset request success:", res);
        this.step = 2; // move to confirm step
      },
      error: (err) => {
        this.message = 'Failed to send reset code.';
        console.error("Reset request error:", err);
      }
    });
  }

  confirmResetPassword() {
    this.apiService.confirmTrusteeResetPassword(
      this.email,
      this.confirmationCode,
      this.newPassword
    ).subscribe({
      next: (res) => {
        this.message = res.message || 'Password reset successful!';
        //console.log("Confirm success:", res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = 'Error confirming password reset.';
        console.error("Confirm error:", err);
      }
    });
  }
}