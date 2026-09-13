import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { App } from './app';
import { MenuBar } from './menu-bar/menu-bar';

describe('App', () => {

  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create the app', () => {

    expect(component).toBeTruthy();

  });


  it('should display the menu bar', () => {

    const menuBar =
      fixture.debugElement.query(By.directive(MenuBar));

    expect(menuBar).toBeTruthy();

  });


  it('should contain a router outlet', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const routerOutlet =
      compiled.querySelector('router-outlet');

    expect(routerOutlet).toBeTruthy();

  });

});
