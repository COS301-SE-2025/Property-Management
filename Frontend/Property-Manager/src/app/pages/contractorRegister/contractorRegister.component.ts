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
    templateUrl: `./contractor-register.component.html`,
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