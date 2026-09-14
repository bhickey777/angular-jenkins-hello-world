import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MarketCard } from "./market-card";

describe("MarketCard", () => {
  let component: MarketCard;
  let fixture: ComponentFixture<MarketCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
