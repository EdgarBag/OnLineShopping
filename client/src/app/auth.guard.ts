import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './services/users.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public constructor(private usersService: UsersService,
    private router: Router) { }

  canActivate(): boolean {

    if (this.usersService.isTokenExist()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
