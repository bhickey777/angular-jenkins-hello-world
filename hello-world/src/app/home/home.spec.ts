import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';

describe('Home', () => {

  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create the home component', () => {

    expect(component).toBeTruthy();

  });


  it('should display the company name', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('HELLO WORLD FINANCIAL');

  });


  it('should display the main hero heading', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const heading =
      compiled.querySelector('.hero h1');

    expect(heading).toBeTruthy();

    expect(heading?.textContent)
      .toContain('Smarter tools');

  });


  it('should display the market overview', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const marketCard =
      compiled.querySelector('.market-card');

    expect(marketCard).toBeTruthy();

    expect(marketCard?.textContent)
      .toContain('Market Overview');

  });


  it('should display three service cards', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const serviceCards =
      compiled.querySelectorAll('.service-card');

    expect(serviceCards.length).toBe(3);

  });


  it('should display Trade Orders service', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('Trade Orders');

  });


  it('should display Stock Pricing service', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('Stock Pricing');

  });


  it('should display Investments service', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('Investments');

  });


  it('should have a Get Started link to signup', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const link =
      compiled.querySelector(
        '.primary-button'
      ) as HTMLAnchorElement;

    expect(link).toBeTruthy();

    expect(link.getAttribute('href'))
      .toBe('/signup');

  });


  it('should have a Login link', () => {

    const compiled =
      fixture.nativeElement as HTMLElement;

    const link =
      compiled.querySelector(
        '.secondary-button'
      ) as HTMLAnchorElement;

    expect(link).toBeTruthy();

    expect(link.getAttribute('href'))
      .toBe('/login');

  });

});
