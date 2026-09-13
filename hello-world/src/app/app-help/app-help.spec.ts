import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHelp } from './app-help';

describe('Help', () => {

  let component: AppHelp;
  let fixture: ComponentFixture<AppHelp>;
  let compiled: HTMLElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppHelp]
    }).compileComponents();

    fixture = TestBed.createComponent(AppHelp);
    component = fixture.componentInstance;

    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
  });


  it('should create the help component', () => {

    expect(component).toBeTruthy();

  });


  it('should display the help heading', () => {

    const heading = compiled.querySelector('h1');

    expect(heading).toBeTruthy();
    expect(heading?.textContent?.trim())
      .toBe('How can we help?');

  });


  it('should display three contact cards', () => {

    const cards =
      compiled.querySelectorAll('.contact-card');

    expect(cards.length).toBe(3);

  });


  it('should display the correct support departments', () => {

    const headings =
      Array.from(
        compiled.querySelectorAll('.contact-card h2')
      )
      .map(
        heading => heading.textContent?.trim()
      );

    expect(headings).toEqual([
      'Customer Support',
      'Trading Support',
      'Fraud & Security'
    ]);

  });


  it('should display three support phone links', () => {

    const phoneLinks =
      compiled.querySelectorAll(
        '.contact-card a[href^="tel:"]'
      );

    expect(phoneLinks.length).toBe(3);

  });


  it('should have the correct customer support phone number', () => {

    const link =
      compiled.querySelector(
        'a[href="tel:+18005550100"]'
      );

    expect(link).toBeTruthy();

    expect(link?.textContent?.trim())
      .toBe('1-800-555-0100');

  });


  it('should have the correct trading support phone number', () => {

    const link =
      compiled.querySelector(
        'a[href="tel:+18005550200"]'
      );

    expect(link).toBeTruthy();

    expect(link?.textContent?.trim())
      .toBe('1-800-555-0200');

  });


  it('should have the fraud and security phone number', () => {

    const link =
      compiled.querySelector(
        'a[href="tel:+18005550911"]'
      );

    expect(link).toBeTruthy();

    expect(link?.textContent?.trim())
      .toBe('1-800-555-0911');

  });


  it('should display six helpful tips', () => {

    const tips =
      compiled.querySelectorAll('.tip-card');

    expect(tips.length).toBe(6);

  });


  it('should display the security reminder', () => {

    const securityNotice =
      compiled.querySelector('.security-notice');

    expect(securityNotice).toBeTruthy();

    expect(securityNotice?.textContent)
      .toContain('Security Reminder');

  });

});
