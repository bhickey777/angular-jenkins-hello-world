import {
  Component,
  OnDestroy,
  OnInit,
  signal,
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

  quotes = signal<StockQuote[]>([]);

  marketError = false;

  private marketSubscription?: Subscription;

  constructor(
    private marketService: MarketService,
  ) {
  }

  showQuotes(): void {
    console.log(
      `Number of quotes: ${this.quotes.length}`
    );

     console.log(this.quotes);
     this.marketError = false;
  }

  ngOnInit(): void {

    console.log("NgInit - Market Card");
    this.marketSubscription = interval(30000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.marketService.getQuotes()
        )
      )
      .subscribe({
        next: quotes => {
          this.quotes.set(quotes);
          this.showQuotes();
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
