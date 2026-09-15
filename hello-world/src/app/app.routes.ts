import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Signup } from './signup/signup';
import { AppHelp } from './app-help/app-help';

export const routes: Routes = [
  { path: '', redirectTo: 'holdings', pathMatch: 'full' },
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
    component: Signup
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
