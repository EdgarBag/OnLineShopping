import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  public addOrderToMongo(order): Observable<Order> {
    return this.httpClient.post<Order>('http://localhost:3000/api/orders/', order)
  }
}
