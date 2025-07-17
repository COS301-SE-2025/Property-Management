import { Component, inject } from '@angular/core';
import { IonInput, IonItem} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'shared';
import { Router } from '@angular/router';
import { StorageService } from 'shared';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, IonInput, IonItem],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  public email = "";
  public password = "";
  public passwordVisible = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private storage = inject(StorageService);

  constructor() { }

  togglePassword()
  {
    this.passwordVisible = !this.passwordVisible;
  }

  async register()
  {
    if(!this.email || !this.password)
    {
      this.emptyField = true;
      return;
    }

    this.userError = false;
    this.serverError = false;
    this.emptyField = false;

    try{
      const result = await this.authService.trusteeRegister(this.email, this.password);

      this.storage.set('pendingUsername', result.username);

      this.router.navigate(['/verifyEmail'], {
        state: {
          username: result.username
        }
      });
    }
    catch(error)
    {
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