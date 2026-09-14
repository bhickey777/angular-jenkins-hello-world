import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockQuote } from '../models/stock-quote.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private readonly apiUrl =
    'http://localhost:8000/api/market/quotes';

  constructor(
    private http: HttpClient
  ) {
  }

  getQuotes(): Observable<StockQuote[]> {

    return this.http.get<StockQuote[]>(
      `${this.apiUrl}?symbols=AAPL,MSFT,NVDA`
    );

  }
}
