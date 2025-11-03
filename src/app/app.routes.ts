import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrencyComponent } from './currency/currency.component';
import { UserListComponent } from './user-list/user-list.component';
import { CurrencySortComponent } from './currency-sort/currency-sort.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'currency-sort', component: CurrencySortComponent },
  { path: 'user-list', component: UserListComponent }
];
