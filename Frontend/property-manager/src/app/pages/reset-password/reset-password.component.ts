import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService, ContractorApiService, getCookieValue } from 'shared';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

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

export class ResetPasswordComponent  {
  email = '';
  oldPassword = '';
  newPassword = '';
  message = '';
  confirmationCode = '';

  constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  async resetPassword() {
    // console.log(`Resetting password for ${this.email}`);
    // this.authService.resetContractorPasswordRequest(this.email).subscribe({
    //   next: res => {
    //     this.message = res.message;
    //   },
    //   error: err => {
    //     this.message = 'Error sending reset code.';
    //     console.error(err)
    //   }
    // });
    this.authService.resetContractorPasswordRequest(this.email).subscribe({
      next: (res) => {
        console.log("Success:", res);
      },
      error: (err) => {
        console.error("Error:", err);
      }
    });

  }

   confirmResetPassword() {
    this.authService.confirmContractorResetPasswordRequest(
      this.email,
      this.confirmationCode,
      this.newPassword
    ).subscribe({
      next: res => {
        this.message = res.message; // "Password has been reset successfully."
      },
      error: err => {
        this.message = 'Error confirming reset.';
        console.error(err);
      }
    });
  }
}
