import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-contractor-register',
    imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
    template: `
    <div class = "flex w-full justify-center items-center h-screen">
       <div class="flex w-full h-screen shadow-lg rounded-none overflow-hidden border">

          <div class="w-2/6 bg-white flex flex-col items-center justify-center p-6">
          <img class="h-40 mb-4" src="assets/images/logo.png" alt="App logo">
          <p class="font-bold text-2xl text-center text-gray-800">Property Manager</p>
            </div>

    
          <div class = "w-4/6 propertyYellow-bg p-13 flex flex-col justify-center space-y-4">
            <p class = "text-center text-xl font-semibold">Register as Contractor</p>
            
            <p-floatlabel variant="on">
                <img *ngIf = "!companyName" class = "absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/suitcase.svg" alt="">
                <input class = "w-full border rounded !bg-white" pInputText id = "on_label" [(ngModel)]="companyName" autocomplete="off">
                <label class = "pl-6" for="on_label">Enter Company name</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <img *ngIf = "!companyAddress" class= "absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/location.svg" alt="">
                <input class = "w-full border rounded !bg-white" pInputText id = "on_label" [(ngModel)]="companyAddress" autocomplete="off">
                <label class = "pl-6" for="on_label">Enter Company address</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <img *ngIf = "!contactNumber" class = "absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/telephone.svg" alt="">
                <input class = "w-full border rounded !bg-white" pInputText id = "on_label" [(ngModel)]="contactNumber" autocomplete="off">
                <label class = "pl-6" for="on_label">Enter Contact number</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <img *ngIf = "!email" class = "absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/mail.svg" alt="">
                <input class = "w-full border rounded !bg-white" pInputText id = "on_label" [(ngModel)]="email" autocomplete="off">
                <label class = "pl-6" for="on_label">Enter email address</label>
            </p-floatlabel>

            <p-floatlabel variant="on" class="relative">
             <img *ngIf="!password" class="absolute top-3 left-2 h-5 w-5 pointer-events-none" src="assets/icons/key_vertical.svg" alt="">

                <input
                    class="w-full border rounded py-2 pl-8 pr-10 !bg-white"
                    [type]="passwordVisible ? 'text' : 'password'"
                    pInputText
                    id="over_label"
                    [(ngModel)]="password"
                    autocomplete="off"
                />

                <label class="pl-5" for="over_label">Enter password</label>

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
              <p *ngIf="emptyField" class="text-red-500 py-1 font-semibold rounded">Email or password missing</p>

              <p *ngIf="userError" class="text-red-500 py-1 font-semibold rounded">Email or password incorrect</p>

              <p *ngIf="serverError" class="text-red-500 py-1 font-semibold rounded">Internal server error</p>
            </div>

            <div class = "text-center text-sm space-y-2">
              <a class = "block" href="">Forgot password?</a>
              <a class = "font-semibold" href="/register-owner">Register as Owner?</a>
              <br>
              <a class = "font-bold" href="/login">Login?</a>
            </div>
        </div>
      </div>
  </div>
  `,
    styles: ``,
})

export class ContractorRegisterComponent {
    public email = "";
    public password = "";
    public companyName = "";
    public companyAddress = "";
    public contactNumber = "";
    public passwordVisible = false;

    public emptyField = false;
    public userError = false;
    public serverError = false;

    constructor(
    private apiService: ApiService,
    private authService: AuthService, private router: Router
  ) {}

    togglePassword() {
        this.passwordVisible = !this.passwordVisible;
    }

   private generateApiKey(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `key_${Math.abs(hash).toString(36)}_${randomPart}`;
}

   async register(): Promise<void> {
    if (this.email.length === 0 || this.password.length === 0 || this.contactNumber.length === 0) {
      this.emptyField = true;
      return;
    }

    this.userError = false;
    this.serverError = false;
    this.emptyField = false;

        console.log(this.email)
        console.log(this.password)

        return this.authService.register(this.email, this.password, 'contractor')
            .then(tokens => {
                //TODO: Store tokens
                console.log("Successfully logged in");
                console.log(tokens);

                this.router.navigate(['/verifyEmail'], {
                    state: {
                        username: tokens.user.getUsername()
                    }
                });
            })
            .catch(error => {
                console.error("Login error: ", error);

                const status = error?.status || error?.__zone_symbol__status;
                console.log(status);

                if (status === 400 || error.code === "NotAuthorizedException") {
                    this.userError = true;
                }
                else {
                    this.serverError = true;
                }
            });
    }
}