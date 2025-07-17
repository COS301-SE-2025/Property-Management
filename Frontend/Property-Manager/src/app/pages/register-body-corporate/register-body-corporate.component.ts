import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  public emptyField = false;
  public userError = false;
  public serverError = false;
  public errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  async register(): Promise<void> {
    if (!this.corporateName || !this.contributionPerSqm || !this.email || !this.contactNumber || !this.password) {
      this.emptyField = true;
      return;
    }

    const contributionPerSqmValue = parseFloat(this.contributionPerSqm);
    if (isNaN(contributionPerSqmValue) || contributionPerSqmValue <= 0) {
      this.userError = true;
      return;
    }

    this.userError = false;
    this.serverError = false;
    this.emptyField = false;
    this.errorMessage = '';

    let normalizedContactNumber = this.contactNumber;
    if (normalizedContactNumber.startsWith('0')) {
      normalizedContactNumber = '+27' + normalizedContactNumber.substring(1);
    } else if (!normalizedContactNumber.startsWith('+27')) {
      normalizedContactNumber = '+27' + normalizedContactNumber;
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

      console.log('Registration successful:', result);
      sessionStorage.setItem('pendingUsername', result.username);
      sessionStorage.setItem('userType', 'bodyCorporate');

      this.router.navigate(['/verifyEmail'], {
        state: { username: result.username }
      });
    } catch (error: unknown) {
      console.error('Registration error:', error);
      
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = error.error?.message || error.message || 'Registration failed. Please try again later.';
        if (error.status === 400 || error.error?.code === 'NotAuthorizedException') {
          this.userError = true;
        } else {
          this.serverError = true;
        }
      }else {
        this.errorMessage = 'An unexpected error occurred.';
        this.serverError = true;
      }
    }
  }
}