import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Transact } from "./transact";

describe("Transact", () => {
  let component: Transact;
  let fixture: ComponentFixture<Transact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transact],
    }).compileComponents();

    fixture = TestBed.createComponent(Transact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
