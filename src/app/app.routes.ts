import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrencyComponent } from './currency/components/currency/currency.component';
import { CurrencySortComponent } from './currency/components/currency-sort/currency-sort.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { UserEditComponent } from './user/components/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/components/user-delete/user-delete.component';
import { authGuard, guestGuard } from './user/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    canActivate: [guestGuard]
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'currency', 
    component: CurrencyComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'currency-sort', 
    component: CurrencySortComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'user-list', 
    component: UserListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'user-edit/:id', 
    component: UserEditComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'user-delete/:id', 
    component: UserDeleteComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];
