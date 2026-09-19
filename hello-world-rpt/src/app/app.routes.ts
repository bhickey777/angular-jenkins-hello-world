import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
      loadComponent: () =>
      import('./login/login').then((m) => m.Login),
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
