import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FormsModule, CommonModule, FloatLabelModule],
  template: `
    <div class = "flex w-full justify-center items-center h-screen">
      <div class = "flex w-[700px] h-[400px] shadow-lg rounded overflow-hidden border">

          <div class = "w-2/6 bg-white flex flex-col items-center justify-center p-6">
            <img class = "h-24 mb-4" src="assets/images/logo.png" alt="App logo">
            <p class = "font-semibold text-lg">Property Manager</p>
          </div>
    
          <div class = "w-4/6 propertyYellow-bg p-13 flex flex-col justify-center space-y-4">
            <p class = "text-center text-xl font-semibold">Sign in</p>

            <p-floatlabel variant="on">
                <img *ngIf = "!email" class = "absolute top-3 left-3 h-5 w-5 pointer-events-none" src="assets/icons/mail.svg" alt="">
                <input class = "w-full border rounded" pInputText id = "on_label" [(ngModel)]="email" autocomplete="off">
                <label class = "pl-6" for="on_label">Enter email address</label>
            </p-floatlabel>
            <p-floatlabel variant="on">
                <img *ngIf = "!password" class = "absolute top-3 left-2 h-5 w-5" src="assets/icons/key_vertical.svg" alt="">
                <input class = "w-full border rounded py-2" [type]= "passwordVisible ? 'text' : 'password'" pInputText id = "over_label" [(ngModel)]="password" autocomplete="off">
                <label class = "pl-5" for="on_label">Enter password</label>
                <button type = "button" (click)="togglePassword()">
                  <img class = "absolute top-3 left-82 h-5 w-5" [src]= "passwordVisible ? 'assets/icons/visibility.svg' :'assets/icons/visibility_off.svg'" alt="">
                </button>
            </p-floatlabel>

            <div class = "pl-25">
              <button (click)="login()" class = "bg-black text-white px-14 py-2 rounded font-semibold hover:bg-gray-800">Login</button>
            </div>

            <div *ngIf="emptyField || userError || serverError" class="pl-20">
              <p *ngIf="emptyField" class="text-red-500 py-1 font-semibold rounded">Email or password missing</p>

              <p *ngIf="userError" class="text-red-500 py-1 font-semibold rounded">Email or password incorrect</p>

              <p *ngIf="serverError" class="text-red-500 py-1 font-semibold rounded">Internal server error</p>
            </div>

            <div class = "text-center text-sm space-y-2">
              <a class = "block" href="">Forgot password?</a>
              <a class = "font-semibold" href="">Create Account?</a>
            </div>
        </div>
      </div>
  </div>
  `,
  styles: ``,
})

export class LoginComponent {
  public email = "";
  public password = "";
  public passwordVisible = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;

  constructor(private authService: AuthService, private router: Router){}

  togglePassword()
  {
    this.passwordVisible = !this.passwordVisible;
  }

  login()
  {

    if(this.email.length === 0 || this.password.length === 0)
    {
      this.emptyField = true;
      return;
    }

    this.userError = false;
    this.serverError = false;
    this.emptyField = false;

    console.log(this.email)
    console.log(this.password)

    return this.authService.login(this.email, this.password)
    .then(tokens => {
      //TODO: Store tokens
      console.log("Successfully logged in");
      console.log(tokens);

      this.router.navigate(['/home']);
    })
    .catch(error => {
      console.error("Login error: ", error);

      const status = error?.status || error?.__zone_symbol__status;
      console.log(status);

      if(status === 400 || error.code === "NotAuthorizedException") 
      {
        this.userError = true;
      }
      else
      {
        this.serverError = true;
      }
    });
  }
}
