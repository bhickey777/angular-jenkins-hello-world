import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  interval,
  startWith,
  Subscription,
  switchMap
} from 'rxjs';

import { MarketService } from '../services/market';
import { StockQuote } from '../models/stock-quote.model';

@Component({
  selector: 'app-market-card',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './market-card.html',
  styleUrl: './market-card.css'
})

export class MarketCard implements OnInit, OnDestroy {

  quotes: StockQuote[] = [];

  marketError = false;

  private marketSubscription?: Subscription;

  constructor(
    private marketService: MarketService
  ) {
  }

  ngOnInit(): void {

    this.marketSubscription = interval(30000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.marketService.getQuotes()
        )
      )
      .subscribe({
        next: quotes => {
          this.quotes = quotes;
          this.marketError = false;
        },

        error: error => {
          console.error(
            'Unable to retrieve market data',
            error
          );

          this.marketError = true;
        }
      });

  }

  ngOnDestroy(): void {

    this.marketSubscription?.unsubscribe();

  }
}
