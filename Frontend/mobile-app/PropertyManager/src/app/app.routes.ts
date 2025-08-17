import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

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
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard(['trustee'])]
    },
    {
        path: 'create-property',
        loadComponent: () => import('./pages/create-property/create-property.component').then(m => m.CreatePropertyComponent),
        canActivate: [authGuard(['trustee'])]
    },
    {
        path: 'view-house/:houseId',
        loadComponent: () => import('./pages/view-house/view-house.component').then(m => m.ViewHouseComponent),
        canActivate: [authGuard(['trustee'])]
    },
    {
        path: 'manage-budget/:houseId',
        loadComponent: () => import('./pages/manage-budget/manage-budget.component').then(m => m.ManageBudgetComponent),
        canActivate: [authGuard(['trustee'])]
    },
    {
        path: 'view-task/:taskId',
        loadComponent: () => import('./pages/view-task/view-task.component').then(m => m.ViewTaskComponent),
        canActivate: [authGuard(['trustee', 'contractor'])]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'voting',
        loadComponent: () => import('./pages/voting/voting.component').then(m => m.VotingComponent),
        canActivate: [authGuard(['trustee'])]
    },
    {
        path: 'voting/:sessionId',
        loadComponent: () => import('./pages/voting/details/details.component').then(m => m.DetailsComponent),
        canActivate: [authGuard(['trustee'])]
    },
    {
        path: 'contractor-profile',
        loadComponent: () => import('./pages/contractor-profile/contractor-profile.component').then(m => m.ContractorProfileComponent),
        canActivate: [authGuard(['contractor'])]
    },
    {
        path: 'contractor-home',
        loadComponent: () => import('./pages/contractor-home/contractor-home.component').then(m => m.ContractorHomeComponent),
        canActivate: [authGuard(['contractor'])]
    },
    {
        path: 'quotation/:t_uuid',
        loadComponent: () => import('./pages/quotation/quotation.component').then(m => m.QuotationComponent),
        canActivate: [authGuard(['contractor'])]
    },
    {
        path: 'notifications',
        loadComponent: () => import('./pages/notification/notification.component').then(m => m.NotificationComponent)
    },
    {
        path:'assigned-tasks',
        loadComponent: () => import('./pages/assigned-projects/assigned.component').then(m => m.AssignedComponent)
    },
    {
        path:'submitted-quotations',
        loadComponent: () => import('./pages/submitted-quotations/submitted-quotations.component').then(m => m.SubmittedQuotationsComponent)    
    }
];
