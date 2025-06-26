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
  template: `
    <div class="flex w-full justify-center items-center h-screen">
      <div class="flex w-full h-screen shadow-lg rounded-none overflow-hidden border">
        
        <div class="w-2/6 bg-white flex flex-col items-center justify-center p-6">
          <img class="h-40 mb-4" src="assets/images/logo.png" alt="App logo">
          <p class="font-bold text-2xl text-center text-gray-800">Property Manager</p>
        </div>

        <div class="w-4/6 propertyYellow-bg p-13 flex flex-col justify-center space-y-4">
          <p class="text-center text-xl font-semibold">Register as Body Corporate</p>

          <p-floatlabel variant="on">
            <img *ngIf="!corporateName" class="absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/suitcase.svg" alt="">
            <input class="w-full border rounded !bg-white" pInputText id="corporate_name" [(ngModel)]="corporateName" autocomplete="off">
            <label class="pl-6" for="corporate_name">Body Corporate Name</label>
          </p-floatlabel>

          <p-floatlabel variant="on">
            <img *ngIf="!registrationNumber" class="absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/telephone.svg" alt="">
            <input class="w-full border rounded !bg-white" pInputText id="reg_number" [(ngModel)]="registrationNumber" autocomplete="off">
            <label class="pl-6" for="reg_number">Scheme Number</label>
          </p-floatlabel>

          <p-floatlabel variant="on">
            <img *ngIf="!email" class="absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/mail.svg" alt="">
            <input class="w-full border rounded !bg-white" pInputText id="email_label" [(ngModel)]="email" autocomplete="off">
            <label class="pl-6" for="email_label">Official Email Address</label>
          </p-floatlabel>

          <p-floatlabel variant="on">
            <img *ngIf="!contactNumber" class="absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/telephone.svg" alt="">
            <input class="w-full border rounded !bg-white" pInputText id="contact_label" [(ngModel)]="contactNumber" autocomplete="off">
            <label class="pl-6" for="contact_label">Contact Number</label>
          </p-floatlabel>

          <p-floatlabel variant="on" class="relative">
            <img *ngIf="!password" class="absolute top-3 left-2 h-5 w-5 pointer-events-none" src="assets/icons/key_vertical.svg" alt="">
            <input
              class="w-full border rounded py-2 pl-8 pr-10 !bg-white"
              [type]="passwordVisible ? 'text' : 'password'"
              pInputText
              id="password_label"
              [(ngModel)]="password"
              autocomplete="off"
            />
            <label class="pl-5" for="password_label">Enter password</label>
            <button type="button" (click)="togglePassword()" class="absolute top-2.5 right-2">
              <img
                class="h-5 w-5"
                [src]="passwordVisible ? 'assets/icons/visibility.svg' : 'assets/icons/visibility_off.svg'"
                alt="Toggle visibility"
              />
            </button>
          </p-floatlabel>

          <div class="flex justify-center">
            <button (click)="register()" class="bg-black text-white px-14 py-2 rounded font-semibold hover:bg-gray-800">Register</button>
          </div>

          <div *ngIf="emptyField || userError || serverError" class="pl-20">
            <p *ngIf="emptyField" class="text-red-500 py-1 font-semibold rounded">All fields are required</p>
            <p *ngIf="userError" class="text-red-500 py-1 font-semibold rounded">Registration failed</p>
            <p *ngIf="serverError" class="text-red-500 py-1 font-semibold rounded">Internal server error</p>
          </div>

          <div class="text-center text-sm space-y-2">
            <a class="block" href="">Forgot password?</a>
            <a class="font-semibold" href="/registerHub">Create Account?</a>
            <br>
            <a class="font-bold" href="/login">Login?</a>
          </div>
        </div>
      </div>
    </div>
  `
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
      // const result = await this.authService.register(this.email, this.password, 'bodyCorporate');
      
      // Add API call to register body corporate details
    //   await this.apiService.registerBodyCorporate(
    //     this.corporateName,
    //     this.registrationNumber,
    //     this.email,
    //     this.contactNumber,
    //     result.user.getUsername()
    //   ).toPromise();

      // this.router.navigate(['/verifyEmail'], {
      //   state: {
      //     username: result.user.getUsername()
      //   }
      // });
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