import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderRequest } from '../models/orderRequest';
import { OrderResponse } from '../models/orderResponse';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private readonly baseUrl =
    'http://localhost:8090';

  constructor(private http: HttpClient) {}

  submitOrder(
    clientId: number,
    order: OrderRequest
  ): Observable<OrderResponse> {

    return this.http.post<OrderResponse>(
      `${this.baseUrl}/trades/${clientId}/orders`,
      order
    );
  }
}
