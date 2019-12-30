import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Action } from '../redux/action';
import { ActionType } from '../redux/actionType';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public constructor(private htttpClient: HttpClient,
    private redux: NgRedux<AppState>) { }


  public getAllCategories(): void {
    this.htttpClient.get<Category[]>('http://localhost:3000/api/categories')
      .subscribe(categories => {
        const action: Action = { type: ActionType.getAllCategories, payload: categories }
        this.redux.dispatch(action);
      });
  };

}
