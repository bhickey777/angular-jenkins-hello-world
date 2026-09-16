import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Holding } from '../models/holding'

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  private readonly baseUrl =
    'http://localhost:6200/api/clients';

  constructor(
    private http: HttpClient
  ) {}

  getHoldings(
    clientId: number
  ): Observable<Holding[]> {

    return this.http.get<Holding[]>(
      `${this.baseUrl}/${clientId}/holdings`
    );
  }
}