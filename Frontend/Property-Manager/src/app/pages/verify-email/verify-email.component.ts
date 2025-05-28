import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  imports: [FloatLabelModule, CommonModule, FormsModule],
  template: `
    <div class = "flex w-full justify-center items-center h-screen bg-gray-100">
      <div class = "flex w-[700px] h-[400px] shadow-lg rounded overflow-hidden border">

        <div class = "w-2/6 bg-white flex flex-col items-center justify-center p-6 border-r">
          <img class = "h-24 mb-4" src="assets/images/logo.png" alt="App logo">
          <p class = "font-semibold text-lg">Property Manager</p>
        </div>

        <div class = "w-4/6 propertyYellow-bg p-8 flex flex-col justify-center">
            <p class = "text-center text-xl font-semibold mb-2">A verification code has been sent to email address. Enter the code here to verify your account </p>
            <div class="mb-6 mt-8">
            <p-floatlabel variant="on">
              <input class="w-full border rounded" pInputText id="on_label" [(ngModel)]="verificationCode" autocomplete="off">
              <label class="pl-6" for="on_label">Enter Verification Code</label>
            </p-floatlabel>
          </div>
          <div>
            <button (click)="sendCode()" class="bg-black text-white px-14 py-2 rounded font-semibold hover:bg-gray-800 w-full">
              Send Verification code
            </button>
          </div>
        </div>


      </div>
    </div>
  `,
  styles: ``
})
export class VerifyEmailComponent {

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      username: string
    };
    
    if (state) {
      this.username = state.username;
    }
  }

  public verificationCode = '';
  public username = '';

  sendCode()
  {
    console.log(this.username);
    console.log(this.verificationCode);
    if(!this.verificationCode)
    {
      return;
    }

    return this.authService.confirmRegister(this.username, this.verificationCode)
    .then(tokens => {
      console.log("Verified email");
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
