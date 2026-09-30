import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trade } from '../models/trade'

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private readonly baseUrl =
    'http://localhost:6200/api/clients';

  constructor(
    private http: HttpClient
  ) {}

  getTrades(
    clientId: number
  ): Observable<Trade[]> {

    return this.http.get<Trade[]>(
      `${this.baseUrl}/${clientId}/trades`
    );
  }
}