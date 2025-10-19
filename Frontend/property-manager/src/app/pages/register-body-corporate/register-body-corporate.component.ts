import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

//interface for error objects 
interface FormErrors {
  corporateName: string;
  contributionPerSqm: string;
  email: string;
  contactNumber: string;
  password: string;
  server: string;
}

@Component({
  selector: 'app-register-body-corporate',
  standalone: true,
  imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
  templateUrl: './register-body-corporate.component.html',
  styles: ``
})
export class RegisterBodyCorporateComponent {
  public corporateName = '';
  public contributionPerSqm = '';
  public email = '';
  public contactNumber = '';
  public password = '';
  public passwordVisible = false;

  public errors: FormErrors = {
    corporateName: '',
    contributionPerSqm: '',
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

  // check password format requirements
  private getPasswordErrors(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain an uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain a lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain a number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=~`]/.test(password)) {
      errors.push('Password must contain a special character.');
    }
    return errors;
  }

  async register(): Promise<void> {
    // Reset errors
    this.errors = {
      corporateName: '',
      contributionPerSqm: '',
      email: '',
      contactNumber: '',
      password: '',
      server: ''
    };

    let hasError = false;

    // Validate corporateName
    if (!this.corporateName) {
      this.errors.corporateName = 'Body Corporate Name is required.';
      hasError = true;
    }

    // Validate contributionPerSqm
    const contributionPerSqmValue = parseFloat(this.contributionPerSqm);
    if (!this.contributionPerSqm) {
      this.errors.contributionPerSqm = 'Contribution per square meter is required.';
      hasError = true;
    } else if (isNaN(contributionPerSqmValue) || contributionPerSqmValue <= 0) {
      this.errors.contributionPerSqm = 'Contribution per square meter must be a valid positive number.';
      hasError = true;
    }

    // Validate email
    if (!this.email) {
      this.errors.email = 'Email is required.';
      hasError = true;
    } else if (!this.isValidEmail(this.email)) {
      this.errors.email = 'Email must contain an @ symbol and a valid domain (e.g., example@domain.com).';
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
    } else {
      const passwordErrors = this.getPasswordErrors(this.password);
      if (passwordErrors.length > 0) {
        this.errors.password = passwordErrors.join(' ');
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    let normalizedContactNumber = this.contactNumber;
    if (normalizedContactNumber.startsWith('0')) {
      normalizedContactNumber = '+27' + normalizedContactNumber.substring(1);
    }

    try {
      const result = await this.authService.bodyCoporateRegister(
        this.corporateName,
        contributionPerSqmValue,
        this.email,
        this.password,
        undefined, // totalBudget
        normalizedContactNumber
      );

      //console.log('Registration successful:', result);
      sessionStorage.setItem('pendingUsername', result.username);
      sessionStorage.setItem('userType', 'bodyCorporate');

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
}