import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewHouseComponent } from './pages/view-house/view-house.component';

export const routes: Routes = [{
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
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
];
