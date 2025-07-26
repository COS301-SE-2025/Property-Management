import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewHouseComponent } from './pages/view-house/view-house.component';
import { RegisterOwnerComponent } from './pages/register-owner/register-owner.component';
import { RegisterBodyCorporateComponent } from './pages/register-body-corporate/register-body-corporate.component';
import { CreatePropertyComponent } from './pages/create-property/create-property.component';

import { ContractorRegisterComponent } from './pages/contractorRegister/contractorRegister.component';
import { ContractorHomeComponent } from './pages/contractorHome/contractorHome.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ManageBudgetComponent } from './pages/manage-budget/manage-budget.component';
import { RegisterHubComponent } from './pages/register-hub/register-hub.component';
import { BcHomeComponent } from './pages/bc-home/bc-home.component';
import { BcContractorsComponent } from './pages/bc-contractors/bc-contractors.component';
import { ContractorDetailsComponent } from './pages/bc-contractors/contractor-details/contractor-details.component';
import { PublicContractorsComponent } from './pages/bc-contractors/public-contractors/public-contractors.component';
import { ContractorProfileComponent } from './pages/contractor-profile/contractor-profile.component';

import { LandingPageComponent } from './pages/LandingPage/LandingPage.component';
import { HelpComponent } from './pages/help/help.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { authGuard } from './auth.guard';
import { VotingComponent } from './pages/voting/voting.component';
import { VotingDetailsComponent } from './pages/voting-details/voting-details.component';
import { TimelineDetailsComponent } from './pages/view-house/timeline-details/timeline-details.component';

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
    path: 'registerHub',
    pathMatch: 'full',
    component: RegisterHubComponent 
  },
  {
     path: 'contractorRegister',
     pathMatch: 'full',
    component: ContractorRegisterComponent
  },
  {
    path: 'register-owner',
    pathMatch: 'full',
    component: RegisterOwnerComponent
  },
  {
    path: 'register-body-corporate',
    pathMatch: 'full',
    component: RegisterBodyCorporateComponent
  },
  {
    path: 'verifyEmail',
    pathMatch: 'full',
    component: VerifyEmailComponent
  },
  {
    path: 'home',
    canActivate: [authGuard(['trustee', 'bodyCorporate'])],
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'viewHouse/:houseId',
    canActivate: [authGuard(['trustee', 'bodyCorporate'])],
    pathMatch: 'full',
    component: ViewHouseComponent
  },
  {
    path:'taskDetails/:taskId',
    canActivate: [authGuard(['trustee', 'bodyCorporate'])],
    pathMatch: 'full',
    component: TimelineDetailsComponent
  },
  { path: 'create-property',
    canActivate: [authGuard(['trustee', 'bodyCorporate'])],
    pathMatch: 'full',
    component: CreatePropertyComponent
  },
  {
    path: 'manageBudget/:houseId',
    canActivate: [authGuard(['trustee', 'bodyCorporate'])],
    pathMatch: 'full',
    component: ManageBudgetComponent
  },
  {
    path: 'voting',
    canActivate: [authGuard(['trustee', 'bodyCorporate'])],
    pathMatch: 'full',
    component: VotingComponent
  },
  {
    path:'voting/:taskId',
    canActivate: [authGuard(['trustee', 'bodyCorporate'])],
    pathMatch: 'full',
    component: VotingDetailsComponent
  },
  {
    path: 'contractorHome',
    canActivate: [authGuard(['contractor'])],
    pathMatch: 'full',
    component: ContractorHomeComponent
  },
  {
    path: 'quotation',
    canActivate: [authGuard(['contractor'])],
    pathMatch: 'full',
    component: QuotationComponent
  },
  {
    path: 'contractor-prof',
    canActivate: [authGuard(['contractor'])],
    component: ContractorProfileComponent
  },
  {
    path: 'bodyCoporate',
    canActivate: [authGuard(['bodyCorporate'])],
    pathMatch: 'full',
    component: BcHomeComponent
  },
  {
    path: 'bodyCoporate/contractors',
    canActivate: [authGuard(['bodyCorporate'])],
    pathMatch: 'full',
    component: BcContractorsComponent
  },
  {
    path: 'contractorDetails/:contractorId/:source',
    canActivate: [authGuard(['bodyCorporate'])],
    pathMatch: 'full',
    component: ContractorDetailsComponent
  },
  {
    path: 'bodyCoporate/publicContractors',
    canActivate: [authGuard(['bodyCorporate'])],
    pathMatch: 'full',
    component: PublicContractorsComponent
  },
  {
    path: 'landingPage',
    pathMatch: 'full',
    component: LandingPageComponent
  },
  {
    path: 'help',
    pathMatch: 'full',
    component: HelpComponent
  },
  {
    path: 'reset-password',
    pathMatch: 'full',
    component: ResetPasswordComponent
  }
];
