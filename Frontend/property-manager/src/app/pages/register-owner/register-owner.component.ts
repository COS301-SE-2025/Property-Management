import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface FormErrors {
  email: string;
  contactNumber: string;
  password: string;
  server: string;
}

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
  templateUrl: './register-owner.component.html',
  styles: ``,
})
export class RegisterOwnerComponent {
   public email = '';
  public password = '';
  public contactNumber = '';
  public passwordVisible = false;

  public errors: FormErrors = {
    email: '',
    contactNumber: '',
    password: '',
    server: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

   private isValidContactNumber(contactNumber: string): boolean {
    const contactNumberRegex = /^0[0-9]{9}$/;
    return contactNumberRegex.test(contactNumber);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async register(): Promise<void> {
    // Reset errors
    this.errors = {
      email: '',
      contactNumber: '',
      password: '',
      server: ''
    };

    let hasError = false;

    // Validate email
    if (!this.email) {
      this.errors.email = 'Email is required.';
      hasError = true;
    } else if (!this.isValidEmail(this.email)) {
      this.errors.email = 'Email must contain an @ symbol ';
      hasError = true;
    }

    // Validate contactNumber
    if (!this.contactNumber) {
      this.errors.contactNumber = 'Contact number is required.';
      hasError = true;
    } else if (!this.isValidContactNumber(this.contactNumber)) {
      if (!this.contactNumber.startsWith('0')) {
        this.errors.contactNumber = 'Contact number must start with 0.';
      } else if (this.contactNumber.length !== 10) {
        this.errors.contactNumber = 'Contact number must be exactly 10 digits long.';
      } else {
        this.errors.contactNumber = 'Contact number must contain only digits.';
      }
      hasError = true;
    }

    // Validate password
    if (!this.password) {
      this.errors.password = 'Password is required.';
      hasError = true;
    }

    if (hasError) {
      return;
    }

    let normalizedContactNumber = this.contactNumber;
    if (normalizedContactNumber.startsWith('0')) {
      normalizedContactNumber = '+27' + normalizedContactNumber.substring(1);
    }

    try {
      const result = await this.authService.trusteeRegister(
        this.email,
        this.password,
        normalizedContactNumber
      );

      sessionStorage.setItem('pendingUsername', result.username);
      sessionStorage.setItem('userType', 'trustee');
      console.log('Registration successful:', result);

      this.router.navigate(['/verifyEmail'], {
        state: { username: result.username }
      });
    } catch (error: unknown) {
      console.error('Registration error:', error);
      if (error instanceof HttpErrorResponse) {
        this.errors.server = error.error?.message || error.message || 'Registration failed. Please try again later.';
      } else {
        this.errors.server = 'An unexpected error occurred.';
      }
    }
  }

// async register(): Promise<void> {
//     if (!this.email || !this.contactNumber || !this.password) {
//       this.emptyField = true;
//       return;
//     }

//     this.userError = false;
//     this.serverError = false;
//     this.emptyField = false;

//     try {
//       const result = await this.authService.trusteeRegister(
//         this.email,
//         this.password,
//         this.contactNumber
//       );

    
//       sessionStorage.setItem('pendingUsername',result.username);
//       sessionStorage.setItem('userType', 'trustee');
//       console.log('Registration successful:', result);

//       this.router.navigate(['/verifyEmail'], {
//         state: {
//           username: result.username
//         }
//       });
//     } catch (error: unknown) {
//       console.error('Registration error:', error);
//       if (
//         typeof error === 'object' &&
//         error !== null &&
//         ('status' in error || 'code' in error)
//       ) {
//         const err = error as { status?: number; code?: string };
//         if (err.status === 400 || err.code === 'NotAuthorizedException') {
//           this.userError = true;
//         } else {
//           this.serverError = true;
//         }
//       } else {
//         this.serverError = true;
//       }
//       throw error;
//     }
//   }
}