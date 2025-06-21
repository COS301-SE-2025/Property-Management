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
},{
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
,{
     path: 'contractorRegister',
     pathMatch: 'full',
    component: ContractorRegisterComponent
},
{
     path: 'contractorHome',
     pathMatch: 'full',
    component: ContractorHomeComponent
},
{
     path: 'quotation',
     pathMatch: 'full',
    component: QuotationComponent
},
{
  path: 'verifyEmail',
  pathMatch: 'full',
  component: VerifyEmailComponent
},
{
  path: 'register-body-corporate',
  pathMatch: 'full',
  component: RegisterBodyCorporateComponent
},
{
  path: 'manageBudget/:houseId',
  pathMatch: 'full',
  component: ManageBudgetComponent
},
{
  path: 'registerHub',
  pathMatch: 'full',
  component: RegisterHubComponent
},
{
  path: 'bodyCoporate',
  pathMatch: 'full',
  component: BcHomeComponent
}
];
