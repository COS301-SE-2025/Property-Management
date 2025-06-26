import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
  template: `
    <div class="flex w-full justify-center items-center h-screen">
      <div class="flex w-[700px] h-[400px] shadow-lg rounded overflow-hidden border">

        <div class="w-2/6 bg-white flex flex-col items-center justify-center p-6">
          <img class="h-24 mb-4" src="assets/images/PM-Logo.png" alt="App logo">
          <p class="font-semibold text-lg">Property Manager</p>
        </div>

        <div class="w-4/6 propertyYellow-bg p-13 flex flex-col justify-center space-y-4">
          <p class="text-center text-xl font-semibold">Register as Owner</p>

          <p-floatlabel variant="on">
            <img *ngIf="!email" class="absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/mail.svg" alt="">
            <input class="w-full border rounded" pInputText id="email_label" [(ngModel)]="email" autocomplete="off">
            <label class="pl-6" for="email_label">Enter email address</label>
          </p-floatlabel>

          <p-floatlabel variant="on">
            <img *ngIf="!contactNumber" class="absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/telephone.svg" alt="">
            <input class="w-full border rounded !bg-white" pInputText id="contact_label" [(ngModel)]="contactNumber" autocomplete="off">
            <label class="pl-6" for="contact_label">Enter Contact number</label>
          </p-floatlabel>

          <p-floatlabel variant="on" class="relative">
            <img *ngIf="!password" class="absolute top-3 left-2 h-5 w-5" src="assets/icons/key_vertical.svg" alt="">
            <input
              class="w-full border rounded py-2"
              [type]="passwordVisible ? 'text' : 'password'"
              pInputText
              id="password_label"
              [(ngModel)]="password"
              autocomplete="off"
            />
            <label class="pl-5" for="password_label">Enter password</label>
            <button type="button" (click)="togglePassword()">
              <img
                class="absolute top-3 left-82 h-5 w-5"
                [src]="passwordVisible ? 'assets/icons/visibility.svg' :'assets/icons/visibility_off.svg'"
                alt="Toggle visibility"
              />
            </button>
          </p-floatlabel>

          <!-- <div class="pl-25">
            <button (click)="register()" class="bg-black text-white px-14 py-2 rounded font-semibold hover:bg-gray-800">Register</button>
          </div> -->

          <div *ngIf="emptyField || userError || serverError" class="pl-20">
            <p *ngIf="emptyField" class="text-red-500 py-1 font-semibold rounded">Email, contact number, or password missing</p>
            <p *ngIf="userError" class="text-red-500 py-1 font-semibold rounded">Email or password incorrect</p>
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
  `,
  styles: ``,
})
export class RegisterOwnerComponent {
   public email = '';
  public password = '';
  public contactNumber = '';
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

  // async register(): Promise<void> {
  //   if (this.email.length === 0 || this.password.length === 0 || this.contactNumber.length === 0) {
  //     this.emptyField = true;
  //     return;
  //   }

  //   this.userError = false;
  //   this.serverError = false;
  //   this.emptyField = false;

  //   try {

  //     const result = await this.authService.register(this.email, this.password, 'owner');
  //     console.log(result.user.getUsername());

  //     const apikey = result?.userSub || result?.user?.getUsername() || '';

  //     await this.apiService.registerTrustee(this.email, this.email, this.contactNumber, apikey).toPromise();

  //     console.log('Successfully registered');

  //     this.router.navigate(['/verifyEmail'], {
  //         state: {
  //             username: result.user.getUsername()
  //         }
  //     });
  //   } catch (error: unknown) {
  //     console.error('Registration error: ', error);
  //     if (
  //       typeof error === 'object' &&
  //       error !== null &&
  //       ('status' in error || 'code' in error)
  //     ) {
  //       const err = error as { status?: number; code?: string };
  //       if (err.status === 400 || err.code === 'NotAuthorizedException') {
  //         this.userError = true;
  //       } else {
  //         this.serverError = true;
  //       }
  //     } else {
  //       this.serverError = true;
  //     }
  //     throw error;
  //   }
  // }
}