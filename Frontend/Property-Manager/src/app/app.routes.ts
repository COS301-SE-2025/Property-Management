import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContractorRegisterComponent } from './pages/login/contractorRegister.component';
import { ContractorHomeComponent } from './pages/login/contractorHome.component';

export const routes: Routes = [{
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
},{
     path: 'contractorRegister',
     pathMatch: 'full',
    component: ContractorRegisterComponent
},
{
     path: 'contractorHome',
     pathMatch: 'full',
    component: ContractorHomeComponent
},

];
