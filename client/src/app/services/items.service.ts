import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient) { }

  public addItemToMongo(item): Observable<Item> {
    return this.httpClient.post<Item>('http://localhost:3000/api/items/', item)
  }

  public getItemsFromMongo(): Observable<Item[]> {
    return this.httpClient.get<Item[]>('http://localhost:3000/api/items/')
  }

  public getItemsFromMongoByCartID(cartID): Observable<Item[]> {
    return this.httpClient.get<Item[]>('http://localhost:3000/api/items/get-items-by-cartID/' + cartID)
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

  public deleteAllItemsFromMongo(cartID): Observable<Item> {
    return this.httpClient.delete<Item>("http://localhost:3000/api/items/delete-all-items/" + cartID)
  }
  
  public deleteItemFromMongo(id): Observable<Item> {
    return this.httpClient.delete<Item>("http://localhost:3000/api/items/" + id)
  }

}
