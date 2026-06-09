import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { PollComponent } from './components/poll/poll';
import { ResultsComponent } from './components/poll/results/results';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'poll', component: PollComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'login' }
];
