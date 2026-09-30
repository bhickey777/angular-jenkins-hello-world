import {
  HttpInterceptorFn
} from '@angular/common/http';

import {
  inject
} from '@angular/core';

import { TokenStore } from '../../token-store/token-store';

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const tokenStore = inject(TokenStore);
    const token = tokenStore.getToken();

    if (!token) {
      return next(req);
    }

    const authenticatedRequest =
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    return next(authenticatedRequest);
  };