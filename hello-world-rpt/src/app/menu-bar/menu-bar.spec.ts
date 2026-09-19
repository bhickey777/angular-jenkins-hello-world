import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MenuBar } from './menu-bar';

describe('MenuBar', () => {

  let component: MenuBar;
  let fixture: ComponentFixture<MenuBar>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [MenuBar],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuBar);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create the menu bar', () => {

    expect(component).toBeTruthy();

  });


  it('should display the company name', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('Hello World Financial');

  });


  it('should display Login, Sign Up, and Help links', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const links =
      compiled.querySelectorAll('.menu-links a');

    expect(links.length).toBe(4);

  });


  it('should have a Login link', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const loginLink =
      Array.from(
        compiled.querySelectorAll('.menu-links a')
      ).find(
        link => link.textContent?.trim() === 'Login'
      );

    expect(loginLink).toBeTruthy();

    expect(loginLink?.getAttribute('href'))
      .toBe('/login');

  });


  it('should have a Sign Up link', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const signupLink =
      Array.from(
        compiled.querySelectorAll('.menu-links a')
      ).find(
        link => link.textContent?.trim() === 'Sign Up'
      );

    expect(signupLink).toBeTruthy();

    expect(signupLink?.getAttribute('href'))
      .toBe('/signup');

  });


  it('should have a Help link', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const helpLink =
      Array.from(
        compiled.querySelectorAll('.menu-links a')
      ).find(
        link => link.textContent?.trim() === 'Help'
      );

    expect(helpLink).toBeTruthy();

    expect(helpLink?.getAttribute('href'))
      .toBe('/help');

  });

});
