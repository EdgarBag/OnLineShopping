import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class GeneralInformation {

  public newItemSubject = new Subject<any>();
  public newUserSubject = new Subject<any>();

  public constructor(private httpClient: HttpClient) { }

  public getCountOfAllOrders(): Observable<Order> {
    return this.httpClient.get<Order>('http://localhost:3000/api/orders/count');
  }

  public getCountAllAvailableProducts(): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:3000/api/products/count')
  }

  public getAllCities(): Promise<City[]> {
    return new Promise<City[]>((resolve, reject) => {
      fetch("/assets/json/city_list.json")
        .then(response => response.json())
        .then(cities => resolve(cities))
        .catch(err => reject(err));
    })
  }

  public getUserFromls() {
    const userFromLS = JSON.parse(sessionStorage.getItem("user"));
    if (userFromLS) {
      return userFromLS;
    };
  };

  public addItemToCart(data) {
    this.newItemSubject.next(data);
  }

  public getCurrentUser(data) {
    this.newUserSubject.next(data);
  }




  public getCurrentDate(): string {
    const d = new Date();
    let day: any = d.getDate();
    let month: any = (d.getMonth() + 1);
    const year = d.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const a = day + "/" + month + "/" + year;
    return a;
  }


}
