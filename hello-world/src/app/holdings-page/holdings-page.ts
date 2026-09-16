import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { DecimalPipe } from '@angular/common';
import { Holding } from '../models/holding';
import { HoldingService } from '../services/holding-service';
@Component({
  selector: "app-holdings-page",
  imports: [DecimalPipe],
  templateUrl: "./holdings-page.html",
  styleUrl: "./holdings-page.css",
  standalone: true,
})

export class HoldingsPage implements OnInit {
  holdings: Holding[] = [];

  loading = true;
  holdingsError = false;

  // For now we'll use client 1.
  clientId = 1;

  constructor(
    private holdingService: HoldingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.holdingService
      .getHoldings(this.clientId)
      .subscribe({

        next: holdings => {

          this.holdings = holdings;

          this.loading = false;
          this.holdingsError = false;

          this.changeDetectorRef.detectChanges();
        },

        error: error => {

          console.error(
            'Unable to retrieve holdings',
            error
          );

          this.loading = false;
          this.holdingsError = true;

          this.changeDetectorRef.detectChanges();
        }
      });
  }

}
