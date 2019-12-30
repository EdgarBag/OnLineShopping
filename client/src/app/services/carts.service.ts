import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(public httpClient: HttpClient, private itemsService: ItemsService) { }

  public getTotalPriceAndItems(): Promise<Cart> {
    return new Promise<Cart>((resolve, reject) => {
      try {
        var cartID = (JSON.parse(localStorage.getItem("cart")))._id;
        this.itemsService.getItemsFromMongoByCartID(cartID).subscribe(
          items => {
            items = items;
            var object = this.calculation(items);
            resolve(object);
          }, err => alert(err.error))
      }
      catch (err) {
        reject(err);
      }
    });
  }

  public calculation(items) {

    var object: Item = {};
    var totalPrice = 0;
    var totalItems = 0;

    for (let a = 0; a < items.length; a++) {
      totalItems += items[a].amount;
      totalPrice += items[a].totalPrice;
    };

    object.totalPrice = totalPrice;
    object.totalItems = totalItems;
    localStorage.setItem("totalDetails", JSON.stringify(object));
    return object;
  }

  public getTotalPriceOfCart(): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {

      try {
        var itemsFromLS = JSON.parse(localStorage.getItem("cartItems"));
        var object: Item = {};

        if (!itemsFromLS) {
          itemsFromLS = new Array();
        };

        var totalPrice = 0;
        var totalItems = 0;
        
        for (let a = 0; a < itemsFromLS.length; a++) {
          totalItems += itemsFromLS[a].amount;
          totalPrice += itemsFromLS[a].totalPrice;
        };
        object.totalPrice = totalPrice;
        object.totalItems = totalItems;
        resolve(object);
      }
      catch (err) {
        reject(err);
      };
    });
  }

  public isCartOpen(cart): Observable<Cart> {
    return this.httpClient.post<Cart>('http://localhost:3000/api/carts/cart-for-user', cart)
  }

  public createCart(cart): Observable<Cart> {
    return this.httpClient.post<Cart>('http://localhost:3000/api/carts/', cart)
  }

  public changeStatusOfCart(cartID, cartStatus): Observable<Cart> {
    return this.httpClient.patch<Cart>('http://localhost:3000/api/carts/' + cartID, cartStatus);
  }


}
