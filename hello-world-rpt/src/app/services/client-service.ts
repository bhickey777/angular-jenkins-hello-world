import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Client } from '../models/client'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly baseUrl = environment.holdingsUrl + '/api/clients';

  constructor(
    private http: HttpClient
  ) {}

  getClient(
    clientId: number
  ): Observable<Client> {

    return this.http.get<Client>(
      `${this.baseUrl}/${clientId}`
    );
  }
}