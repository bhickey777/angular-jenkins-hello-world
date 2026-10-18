import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

import { Trade } from '../models/trade'

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private readonly baseUrl =  environment.holdingsUrl + '/api/clients';

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