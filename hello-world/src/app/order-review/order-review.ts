import { Component, ChangeDetectorRef,} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { Trade } from '../models/trade';
import { OrderService } from '../services/order-service';
import { OrderResponse } from '../models/orderResponse';

import {
  finalize,
  delay
} from 'rxjs';


@Component({
  selector: 'app-order-review',
  imports: [
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './order-review.html',
  styleUrl: './order-review.css'
})
export class OrderReview {

  trade?: Trade;

  action = 'BUY';

  quantity = 0;
  price = 0;

  clientId = 1;

  processing = false;

  orderResponse?: OrderResponse;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {

    const navigation =
      this.router.getCurrentNavigation();

    const state =
      navigation?.extras.state;

    this.trade = state?.['trade'];
    this.action = state?.['action'] ?? 'BUY';

    if (this.trade) {
      this.price = 5.99; //hard code price for now
    }
  }

  executeTrade(): void {

    if (!this.trade) {
      return;
    }

    this.processing = true;

    const request = {
      ticker: this.trade.ticker,
      quantity: this.quantity,
      price: this.price,
      side: this.action === 'BUY' ? 'BUY' : 'SELL',
      instrumentType: 'FUND'
    };

    this.orderService
    .submitOrder(this.clientId, request)
    .pipe(
      delay(750),

      finalize(() => {
        this.processing = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {

        this.orderResponse = response;

        console.log(
          'Order successful',
          response
        );
      },

      error: (error) => {
        console.error(
          'Order failed',
          error
        );
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/transact']);
  }
}
