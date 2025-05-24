import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewHouseComponent } from './pages/view-house/view-house.component';
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
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'viewHouse/:houseId',
    pathMatch: 'full',
    component: ViewHouseComponent
  },
  { path: 'create-property',
    pathMatch: 'full',
    component: CreatePropertyComponent
  }
];