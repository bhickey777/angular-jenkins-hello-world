import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Client } from '../models/client'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly baseUrl =
     'http://localhost:6200/api/clients/';

  constructor(
    private http: HttpClient
  ) {}

  getHoldings(
    clientId: number
  ): Observable<Client[]> {

    return this.http.get<Client[]>(
      `${this.baseUrl}/${clientId}/`
    );
  }
}