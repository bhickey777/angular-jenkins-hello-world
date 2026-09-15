import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthApi } from '../auth-support/auth-api';
import { TokenStore } from '../token-store/token-store';
import { Login } from "./login";
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe("Login", () => {

  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authApi: jasmine.SpyObj<AuthApi>;
  let tokenStore: jasmine.SpyObj<TokenStore>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    authApi = jasmine.createSpyObj(
      'AuthApi',
      ['login']
    );

    tokenStore = jasmine.createSpyObj(
      'TokenStore',
      ['setToken']
    );

    router = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );

    await TestBed.configureTestingModule({
  
      imports: [Login],

      providers: [
        {
          provide: AuthApi,
          useValue: authApi
        },
        {
          provide: TokenStore,
          useValue: tokenStore
        },
        {
          provide: Router,
          useValue: router
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it('should call AuthApi login when form is submitted', () => {

    authApi.login.and.returnValue(
      of({
        accessToken: 'test-token'
      })
    );

    component.loginForm.setValue({
      username: 'alice',
      password: 'mission123'
    });

    component.submit();

    expect(authApi.login).toHaveBeenCalledWith(
      'alice',
      'mission123'
    );
  });
});
