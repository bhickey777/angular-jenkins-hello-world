import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

import { Trade } from '../models/trade';
import { TradeService } from '../services/trade-service';

@Component({
  selector: 'app-trades',
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './trades.html',
  styleUrl: './trades.css'
})
export class Trades implements OnInit {

  clientId = 1;

  trades: Trade[] = [];

  selectedTrade?: Trade;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private tradeService: TradeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Loading trades for clientId:', this.clientId);
    this.loadTrades();
  }

  loadTrades(): void {

    this.tradeService
      .getTrades(this.clientId)
      .subscribe({
        next: (trades) => {
          this.trades = trades;
          this.changeDetectorRef.detectChanges();
        },

        error: (error) => {
          console.error(
            'Unable to retrieve trades',
            error
          );
        }
      });
  }

  selectTrade(trade: Trade): void {
    this.selectedTrade = trade;
  }

  sell(): void {

    if (!this.selectedTrade) {
      return;
    }

    this.router.navigate(
      ['/order'],
      {
        state: {
          trade: this.selectedTrade,
          action: 'SELL'
        }
      }
    );
  }

  orderMore(): void {

    if (!this.selectedTrade) {
      return;
    }

    this.router.navigate(
      ['/order-review'],
      {
        state: {
          trade: this.selectedTrade,
          action: 'BUY'
        }
      }
    );
  }
}
