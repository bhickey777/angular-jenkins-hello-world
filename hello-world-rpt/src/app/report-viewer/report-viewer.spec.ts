import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReportViewer } from "./report-viewer";

describe("ReportViewer", () => {
  let component: ReportViewer;
  let fixture: ComponentFixture<ReportViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
