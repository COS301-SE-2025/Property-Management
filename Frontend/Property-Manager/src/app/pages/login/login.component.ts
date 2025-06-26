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
  templateUrl: './login.component.html',
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

    // return this.authService.login(this.email, this.password)
    // .then(tokens => {
    //   //TODO: Store tokens
    //   console.log("Successfully logged in")
      
      
    //   if(tokens.givenName === 'owner')
    //   {
    //     this.router.navigate(['/home']);
    //   }
    //   else if(tokens.givenName === 'contractor')
    //   {
    //     this.router.navigate(['/contractorHome']);
    //   }
    // })
    // .catch(error => {
    //   console.error("Login error: ", error);

    //   const status = error?.status || error?.__zone_symbol__status;
    //   console.log(status);

    //   if(status === 400 || error.code === "NotAuthorizedException") 
    //   {
    //     this.userError = true;
    //   }
    //   else
    //   {
    //     this.serverError = true;
    //   }
    // });
  }
}
