import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { Item } from 'src/app/models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { GeneralInformation } from 'src/app/services/generalInformation';
import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  public cities: City[];
  public user = new User();
  public order = new Order();
  public hidden: string;


  constructor(private generalInfo: GeneralInformation,
    private orderService: OrdersService,
    private cartService: CartsService,
    private router: Router,
    title: Title) { title.setTitle(" Order | Payment Details") }


  ngOnInit() {
    this.ifUserOnline();
    this.setCities();
    this.setUser();

  }

  // Getting all cities
  public setCities(): void {
    this.generalInfo.getAllCities()
      .then(cities => this.cities = cities)
      .catch(err => alert(err))
  }

  //Func. to set order details
  public setUser(): void {
    const userLS = (JSON.parse(sessionStorage.getItem("user")));
    this.order.userID = userLS._id;
    this.order.shippingCity = userLS.city;
    this.order.shippingStreet = userLS.street;
    this.order.cartID = (JSON.parse(localStorage.getItem("cart")))._id;
    this.order.totalPriceOFOrder = (JSON.parse(localStorage.getItem("totalDetails"))).totalPrice;
  }

  //func. to check if user Online
  public ifUserOnline(): void {
    let user = this.generalInfo.getUserFromls();
    if (!user) {
      alert("Please log-in");
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  //Func.to send order to DB
  public sendOrder(): void {
    this.orderService.addOrderToMongo(this.order).subscribe(
      response => {
        this.order = response;
        this.closeCart();
      }, err => {
        alert("Please fix the following error(s):\n " + err.error);
      }
    )
  }

  //func to close cart
  public closeCart(): void {
    let cartID = (JSON.parse(localStorage.getItem("cart")))._id;
    var cart = { status: "closed" };
    this.cartService.changeStatusOfCart(cartID, cart).subscribe(
      info => info,
      err => console.log(err.error)
    )
  }
}
