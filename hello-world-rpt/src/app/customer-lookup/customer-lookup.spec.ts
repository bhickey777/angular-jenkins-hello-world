import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomerLookup } from "./customer-lookup";

describe("CustomerLookup", () => {
  let component: CustomerLookup;
  let fixture: ComponentFixture<CustomerLookup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLookup],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerLookup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
