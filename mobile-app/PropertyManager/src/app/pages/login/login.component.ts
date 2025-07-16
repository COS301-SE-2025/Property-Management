import { Component, OnInit } from '@angular/core';
import { IonInput, IonItem} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, IonInput, IonItem],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent  implements OnInit {
  public email = "";
  public password = "";
  public passwordVisible = false;

  public emptyField = false;
  public userError = false;
  public serverError = false;

  constructor() { }

  ngOnInit() {}

  togglePassword()
  {
    this.passwordVisible = !this.passwordVisible;
  }
  login()
  {
    
  }

}
