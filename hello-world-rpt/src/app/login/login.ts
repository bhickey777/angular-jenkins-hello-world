import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '../auth-support/auth-api';
import { TokenStore } from '../token-store/token-store';

@Component({
  selector: "app-login",
  imports: [ReactiveFormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {

  private readonly fb = inject(FormBuilder);
  private readonly tokenStore = inject(TokenStore);
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApi);

  protected readonly error = signal<string | null>(null);

  protected readonly loginForm = this.fb.group({
    username: ['alice', Validators.required],
    password: ['mission123', Validators.required],
  });

  protected submit(): void {
    console.log("submit on login form")
    this.error.set(null);
    const { username, password } = this.loginForm.getRawValue();

    this.authApi.login(username!, password!).subscribe({
      next: (response) => {
        this.tokenStore.setToken(response.accessToken, username!);
        this.router.navigate(['/home']);
      },
      error: (response) => {
        console.log(response);
        this.error.set('Invalid username or password.');
      },
    });
  }
}

