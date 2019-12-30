import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { ActionType } from '../redux/actionType';
import { Action } from '../redux/action';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { GeneralInformation } from './generalInformation';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public constructor(
    private httpClient: HttpClient,
    private usersService: UsersService,
    private generalInfo: GeneralInformation,
    private redux: NgRedux<AppState>, private router: Router) { }


  public getProductByCategory(_id): void {
    this.httpClient
      .get<Product[]>('http://localhost:3000/api/products/products-by-category/' + _id)
      .subscribe(products => {
        const action: Action = { type: ActionType.getAllProducts, payload: products };
        this.redux.dispatch(action);
      }, err => {
        alert(err.error);
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/login']);
      });
  }

  public errorTypeForAdmin(err): void {

    if (err.error === "You don't have permission to perform this action!") {
      alert(err.error);
      sessionStorage.clear();
      localStorage.clear();
      this.generalInfo.getCurrentUser(undefined);
      this.router.navigate(['/login']);
    }
    else if (err.error === 'This product name exist already.\nPlease choose another name!') {
      alert(err.error);
    }
    else {
      alert("Please fix the following error(s):\n " + err.error);
    }
  }


  public updateProductInMongoViaRedux(_id, product: Object): void {
    this.httpClient.patch<Product>('http://localhost:3000/api/products/' + _id, product)
      .subscribe(updatedProduct => {
        const action: Action = { type: ActionType.updateProduct, payload: updatedProduct };
        this.redux.dispatch(action);
        alert('Product have been updated successfully!')
      }, err => {
        this.errorTypeForAdmin(err);
        // if (err.error === "You don't have permission to perform this action!") {
        //   alert(err.error);
        //   sessionStorage.clear();
        //   localStorage.clear();
        //   this.generalInfo.getCurrentUser(undefined);
        //   this.router.navigate(['/login']);
        // }
        // else if (err.error === 'This product name exist already.\nPlease choose another name!') {
        //   alert(err.error);
        // }
        // else {
        //   alert("Please fix the following error(s):\n " + err.error);
        // }


      })
  }

  public addNewProductToMongo(product: Object): void {
    this.httpClient.post<Product>('http://localhost:3000/api/products', product)
      .subscribe(
        product => {
          const action: Action = { type: ActionType.addProduct, payload: product };
          this.redux.dispatch(action);
          alert("Product added successfully!");
        }, err => {
          this.errorTypeForAdmin(err);
          // if (err.error === "You don't have permission to perform this action!") {
          //   alert(err.error);
          //   sessionStorage.clear();
          //   localStorage.clear();
          //   this.generalInfo.getCurrentUser(undefined);
          //   this.router.navigate(['/login']);
          // }
          // else if (err.error === 'This product name exist already.\nPlease choose another name!') {
          //   alert(err.error);
          // }
          // else {
          //   alert("Please fix the following error(s):\n " + err.error);
          // }


        });
  }


  public getProductForSearchRequest(searchValue): Observable<Product[]> {
    const searchResult = this.httpClient.get<Product[]>('http://localhost:3000/api/products/products-by-name/' + searchValue);
    return searchResult;
  }


  public getAllProductsQQ(): void {
    this.httpClient
      .get<Product[]>('http://localhost:3000/api/products')
      .subscribe(products => {
        const action: Action = { type: ActionType.getAllProducts, payload: products };
        this.redux.dispatch(action);
      })
  }

}
