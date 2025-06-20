import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-body-corporate',
  standalone: true,
  imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
  templateUrl: './register-body-corporate.component.html',
})
export class RegisterBodyCorporateComponent {
  public corporateName = '';
  public registrationNumber = '';
  public email = '';
  public contactNumber = '';
  public password = '';
  public passwordVisible = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  async register(): Promise<void> {
    if (!this.corporateName || !this.registrationNumber || !this.email || !this.contactNumber || !this.password) {
      this.emptyField = true;
      return;
    }

    this.userError = false;
    this.serverError = false;
    this.emptyField = false;

    try {
      const result = await this.authService.register(this.email, this.password, 'bodyCorporate');
      
      // Add API call to register body corporate details
    //   await this.apiService.registerBodyCorporate(
    //     this.corporateName,
    //     this.registrationNumber,
    //     this.email,
    //     this.contactNumber,
    //     result.user.getUsername()
    //   ).toPromise();

      this.router.navigate(['/verifyEmail'], {
        state: {
          username: result.user.getUsername()
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
  }
}