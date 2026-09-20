import {
  Component,
  OnInit,
  OnDestroy,
  input,
  effect,
} from '@angular/core';

import { NgIf } from '@angular/common';

import { ReportService } from '../services/report-service';

@Component({
  selector: 'app-report-viewer',
  imports: [NgIf],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.css'
})
export class ReportViewer implements OnInit, OnDestroy {

  reportImageUrl?: string;
  reportType = input<string>();

  constructor(
    private reportService: ReportService
  ) {
    effect(() => {
      const reportType = this.reportType();

      if (reportType == "assetClassTotals") {
        this.viewAssetClassTotals();
      } else if (reportType == "weeklyTrends") {
        this.viewWeeklyTrends();
      }
    });
  }

  viewAssetClassTotals(): void {

    this.reportService
      .getAssetClassTotals()
      .subscribe({
        next: (imageBlob) => {

          // Clean up previous image
          if (this.reportImageUrl) {
            URL.revokeObjectURL(
              this.reportImageUrl
            );
          }

          this.reportImageUrl =
            URL.createObjectURL(imageBlob);
        },

        error: (error) => {
          console.error(
            'Unable to retrieve report',
            error
          );
        }
      });
  }

  viewWeeklyTrends(): void {

    this.reportService
      .getWeeklyTrends()
      .subscribe({
        next: (imageBlob) => {

          // Clean up previous image
          if (this.reportImageUrl) {
            URL.revokeObjectURL(
              this.reportImageUrl
            );
          }

          this.reportImageUrl =
            URL.createObjectURL(imageBlob);
        },

        error: (error) => {
          console.error(
            'Unable to retrieve report',
            error
          );
        }
      });
  }

  ngOnInit(): void {
    this.viewAssetClassTotals();
  }

  ngOnDestroy(): void {
    if (this.reportImageUrl) {
      URL.revokeObjectURL(
        this.reportImageUrl
      );
    }
  }
}
