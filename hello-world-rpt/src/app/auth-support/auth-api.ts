import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_URL = environment.authUrl + 'auth/login';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly http = inject(HttpClient);

  login(username: string, password: string): Observable<LoginResponse> {
    const response = this.http.post<LoginResponse>(AUTH_URL, { username, password });
    console.log(response);
    return response;
  }
}
