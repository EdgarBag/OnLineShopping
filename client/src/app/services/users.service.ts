import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public newUserSubject = new Subject<any>();

  public constructor(private httpClient: HttpClient) { }

  public userLogin(user): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/api/auth/users/login', user)
  }

  public addUser(user): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/api/auth/users/sign-up', user)
  }

  public clearSessionStorage(): void {
    sessionStorage.clear();
  }

  public isTokenExist() {
    return !!sessionStorage.getItem('token')
  }

  public getToken() {
    return sessionStorage.getItem('token')
  }

  public getCurrentUser(data) {
    this.newUserSubject.next(data);
  }


}
