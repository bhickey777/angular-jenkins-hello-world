import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { AppHelp } from './app-help/app-help';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
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
