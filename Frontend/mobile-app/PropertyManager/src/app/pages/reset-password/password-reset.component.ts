import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonAlert,
  IonSpinner
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { ApiService } from 'shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonAlert,
    HeaderComponent,
    TabComponent,
    IonSpinner
  ],
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
export class PasswordResetPage {
  email = '';
  confirmationCode = '';
  newPassword = '';
  confirmPassword = '';
  
  // State management
  isRequestingReset = false;
  isConfirmingReset = false;
  showConfirmationStep = false;
  isLoading = false;
  
  // Alert properties
  showAlert = false;
  alertHeader = '';
  alertMessage = '';
  alertButtons = ['OK'];

  constructor(private apiService: ApiService) {}

  async requestPasswordReset() {
    // Basic validation
    if (!this.email) {
      this.showErrorAlert('Error', 'Please enter your email address');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showErrorAlert('Error', 'Please enter a valid email address');
      return;
    }

    this.isLoading = true;
    this.isRequestingReset = true;

    try {
      await this.apiService.resetTrusteePasswordRequest(this.email).toPromise();
      
      // Success - show confirmation step
      this.showConfirmationStep = true;
      this.showSuccessAlert(
        'Reset Code Sent', 
        'A password reset code has been sent to your email. Please check your inbox and enter the code below.'
      );
      
    } catch (error: any) {
      console.error('Password reset request failed:', error);
      this.showErrorAlert(
        'Reset Failed', 
        error?.error?.message || 'Failed to send reset code. Please try again.'
      );
    } finally {
      this.isLoading = false;
      this.isRequestingReset = false;
    }
  }

  async confirmPasswordReset() {
    // Validation
    if (!this.confirmationCode) {
      this.showErrorAlert('Error', 'Please enter the confirmation code');
      return;
    }

    if (!this.newPassword) {
      this.showErrorAlert('Error', 'Please enter a new password');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showErrorAlert('Error', 'Passwords do not match');
      return;
    }

    if (this.newPassword.length < 6) {
      this.showErrorAlert('Error', 'Password must be at least 6 characters long');
      return;
    }

    this.isLoading = true;
    this.isConfirmingReset = true;

    try {
      await this.apiService.confirmTrusteeResetPassword(
        this.email,
        this.confirmationCode,
        this.newPassword
      ).toPromise();

      // Success
      this.showSuccessAlert(
        'Password Reset Successful', 
        'Your password has been reset successfully. You can now login with your new password.'
      );
      
      // Reset form
      this.resetForm();
      
    } catch (error: any) {
      console.error('Password reset confirmation failed:', error);
      this.showErrorAlert(
        'Reset Failed', 
        error?.error?.message || 'Failed to reset password. Please check the code and try again.'
      );
    } finally {
      this.isLoading = false;
      this.isConfirmingReset = false;
    }
  }

  resetPassword() {
    if (this.showConfirmationStep) {
      this.confirmPasswordReset();
    } else {
      this.requestPasswordReset();
    }
  }

  private resetForm() {
    this.email = '';
    this.confirmationCode = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.showConfirmationStep = false;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showSuccessAlert(header: string, message: string) {
    this.alertHeader = header;
    this.alertMessage = message;
    this.showAlert = true;
  }

  private showErrorAlert(header: string, message: string) {
    this.alertHeader = header;
    this.alertMessage = message;
    this.showAlert = true;
  }

  onAlertDismiss() {
    this.showAlert = false;
  }
}