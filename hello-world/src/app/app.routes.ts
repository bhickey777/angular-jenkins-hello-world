import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AppHelp } from './app-help/app-help';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
      loadComponent: () =>
      import('./login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup').then((m) => m.Signup),
  },
  {
    path: 'holdings',
    loadComponent: () =>
      import('./holdings-page/holdings-page').then((m) => m.HoldingsPage),
  },
  {
    path: 'help',
    component: AppHelp
  },
  {
    path: 'home',
    component: Home
  },
  {
  path: '**',
  redirectTo: ''
}
];
