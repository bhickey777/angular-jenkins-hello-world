import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Signup } from './signup/signup';
import { AppHelp } from './app-help/app-help';
import { HoldingsPage } from './holdings-page/holdings-page';

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
    component: HoldingsPage
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
