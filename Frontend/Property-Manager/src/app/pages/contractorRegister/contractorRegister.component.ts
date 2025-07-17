import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contractor-register',
    imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
    templateUrl: `./contractor-register.component.html`,
    styles: ``,
})

export class ContractorRegisterComponent {
    public email = "";
    public password = "";
    public contactNumber = "";
    public passwordVisible = false;

    public emptyField = false;
    public userError = false;
    public serverError = false;

    constructor(
    private authService: AuthService, private router: Router
  ) {}

    togglePassword() {
        this.passwordVisible = !this.passwordVisible;
    }
    
  async register(): Promise<void> {
    if (!this.email || !this.contactNumber || !this.password) {
      this.emptyField = true;
      return;
    }

    this.userError = false;
    this.serverError = false;
    this.emptyField = false;

    try {
      const result = await this.authService.contractorRegister(
        this.email,
        this.password,
        this.contactNumber
      );

    
      sessionStorage.setItem('pendingUsername',result.username);
      sessionStorage.setItem('userType', 'contractor');
      console.log('Registration successful:', result);    

      this.router.navigate(['/verifyEmail'], {
        state: {
          username: result.username
        }
      });
    } catch (error: unknown) {
      console.error('Registration error:', error);
      if (
        typeof error === 'object' &&
        error !== null &&
        ('status' in error || 'code' in error)
      ) {
        const err = error as { status?: number; code?: string };
        if (err.status === 400 || err.code === 'NotAuthorizedException') {
          this.userError = true;
        } else {
          this.serverError = true;
        }
      } else {
        this.serverError = true;
      }
      throw error;
    }
  }                 //TODO: Store tokens
}