import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
    },
    {
        path: 'registerTrustee',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'registerHub',
        loadComponent: () => import('./pages/register-hub/register-hub.component').then(m => m.RegisterHubComponent)
    },
    {
        path: 'verifyEmail',
        loadComponent: () => import('./pages/verify-email/verify-email.component').then(m => m.VerifyEmailComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'create-property',
        loadComponent: () => import('./pages/create-property/create-property.component').then(m => m.CreatePropertyComponent)
    },
    {
        path: 'view-house/:houseId',
        loadComponent: () => import('./pages/view-house/view-house.component').then(m => m.ViewHouseComponent)
    }
];
