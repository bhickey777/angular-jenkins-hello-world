import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { DecimalPipe } from '@angular/common';
import { Holding } from '../models/holding';
import { Client } from '../models/client';
import { HoldingService } from '../services/holding-service';
import { ClientService } from '../services/client-service';

@Component({
  selector: "app-holdings-page",
  imports: [DecimalPipe],
  templateUrl: "./holdings-page.html",
  styleUrl: "./holdings-page.css",
  standalone: true,
})

export class HoldingsPage implements OnInit {
  holdings: Holding[] = [];
  client?: Client;

  loading = true;
  holdingsError = false;

  // For now we'll use client 1.
  clientId = 1;

  constructor(
    private holdingService: HoldingService,
    private clientService: ClientService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getHoldings();
    this.getClient();
  }

  getHoldings(): void {
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

  getClient(): void {
    this.clientService
      .getClient(this.clientId)
      .subscribe({

        next: client => {
          this.client = client;
          this.changeDetectorRef.detectChanges();
        },

        error: error => {

          console.error(
            'Unable to retrieve client',
            error
          );

          this.changeDetectorRef.detectChanges();
        }
      });
  }

}
