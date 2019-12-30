import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { GeneralInformation } from 'src/app/services/generalInformation';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { Title } from '@angular/platform-browser';
import { CartsService } from 'src/app/services/carts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User();
  public countOfAllOrders = new Order();
  public countfOfProducts = new Product();
  public ifUserLogIn: string;
  public infoOfcustomer: string;
  public resume: string;
  public isAdmin: boolean;

  public constructor(private usersService: UsersService,
    private generalInformation: GeneralInformation,
    private cartService: CartsService,
    private router: Router,
    public location: Location,
    title: Title) { title.setTitle("Login | Online Shopping") }


  public ngOnInit(): void {

    this.generalInformation.getCountOfAllOrders()
      .subscribe(
        number => this.countOfAllOrders = number,
        err => console.log(err),
      );

    this.ifUserLogIn = this.generalInformation.getUserFromls();
    this.generalInformation.getCountAllAvailableProducts()
      .subscribe(
        num => this.countfOfProducts = num,
        err => console.log(err),
      );

    this.isOpenCartExist();
    this.getUpdateOfUser();

  }

  // A function checks if a client exists in the DB and provides permissions depending on the type of client.
  public logIn(): void {
    this.usersService.userLogin(this.user)
      .subscribe(
        response => {
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('token', response.token);
          let user = this.generalInformation.getUserFromls();

          if (user.typeOfUser.length > 10) {
            this.isAdmin = true;
            this.router.navigate(['/home']);
          }
          this.isOpenCartExist();
          this.onUserSubmit(response.user);
        },
        err => {
          alert(err.error);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          };
        }
      );
  }

  public goToHomePage(): void {
    this.ifUserOnline();
    this.router.navigate(['/home']);
  }

  //function cheks if customer is online
  public ifUserOnline(): void {
    let user = this.generalInformation.getUserFromls();
    let token = sessionStorage.getItem("token");

    if (!user || !token) {
      alert("Please log-in!");
      sessionStorage.clear();
      localStorage.clear();

      this.router.navigateByUrl('/login', { skipLocationChange: false }).then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
    }
  }

  //Func checking if customer have open cart, and  Updates greetings accordingly.
  public isOpenCartExist(): void {
    var getUserLS = (JSON.parse(sessionStorage.getItem("user")));

    if (!getUserLS) {
      return;
    }

    var cart = { userID: getUserLS._id, status: "open" };
    this.cartService.isCartOpen(cart).subscribe(
      info => {
        this.infoOfcustomer = `You have open cart from ` + info.currentDate;
        this.resume = "Resume Shopping";
      },
      err => {
        this.resume = "Start Shopping";
        this.infoOfcustomer = "Welcome " + getUserLS.userFirstName;
      }
    )
  }

  public setCurrentUser(user) {
    this.ifUserLogIn = user;
  }

  //Listener function for updates on client
  public getUpdateOfUser(): void {
    this.generalInformation.newUserSubject
      .subscribe(
        info => {
          this.ifUserLogIn = info;
          this.setCurrentUser(info);
        },
        err => console.log(err.error)
      )
  }

  //Function sends client updates to General Servis
  public onUserSubmit(data): void {
    this.generalInformation.getCurrentUser(data)
  }

}
