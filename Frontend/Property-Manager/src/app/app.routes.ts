import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterOwnerComponent } from './pages/register-owner/register-owner.component';
import { CreatePropertyComponent } from './pages/create-property/create-property.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'register-owner',
    pathMatch: 'full',
    component: RegisterOwnerComponent
  },
  {
    path: 'create-property',
    pathMatch: 'full',
    component: CreatePropertyComponent
  }
];
