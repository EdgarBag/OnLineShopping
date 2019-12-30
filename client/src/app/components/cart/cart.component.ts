import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item';
import { GeneralInformation } from 'src/app/services/generalInformation';
import { Router, ActivatedRoute } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { Cart } from 'src/app/models/cart';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public cartItems: Item[];
  public cart = new Cart();
  public totalPrice: number;
  public totalItems: number;
  public payment: number;
  public isAdmin: number;


  constructor(private generalService: GeneralInformation,
    private cartServices: CartsService,
    private router: Router,
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    if (!this.cartItems || this.cartItems.length === 0) {
      this.cartItems = new Array();

      this.setCart();
    }

    this.getNewCartItems();

    const route = this.activatedRoute.snapshot.routeConfig.path;
    if (route === "home/payment") {
      this.payment = 1;
    } else {
      this.payment = 0
    }

    setTimeout(() => {
      this.setCartItems();
    }, 2000)
  }

  //A function checks whether the customer have an open cart,if not, a function produces a new open cart (in both cases save a cart in LS).
  public setCart(): void {
    let userId = this.generalService.getUserFromls()._id;
    this.cart.userID = userId;
    this.cart.status = 'open';
    this.cartServices.isCartOpen(this.cart).subscribe(
      carts => {
        this.cart = carts;
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.setCartItems();
      },
      err => {
        console.log(err.error);
        this.cart.currentDate = this.generalService.getCurrentDate();
        this.cartServices.createCart(this.cart)
          .subscribe(newCart => {
            this.cart = newCart;
            this.setCartItems();
            localStorage.setItem("cart", JSON.stringify(this.cart));
          }, err => console.log(err.error))
      });
  }

  //function getting items for current cart
  public setCartItems(): void {
    setTimeout(() => {
      let cart = (JSON.parse(localStorage.getItem("cart")));
      if (!cart) {
        return;
      };
      this.itemsService
        .getItemsFromMongoByCartID(cart._id)
        .subscribe(items => {
          this.cartItems = items;
        }, err => console.log(err.error))
      this.setTotalPriceItems();
    }, 1200);
  }

  //Func. to add new item to cart
  public getNewCartItems(): void {
    this.generalService.newItemSubject
      .subscribe(
        data => {
          this.itemsService.addItemToMongo(data)
          setTimeout(() => {
            this.setCartItems();
          }, 500);
        }, err => console.log(err)
      )
  }

  //Function for calculation of total price and items per cart
  public setTotalPriceItems(): void {
    this.cartServices.getTotalPriceAndItems()
      .then(data => {
        this.totalPrice = data.totalPrice;
        this.totalItems = data.totalItems;
      })
      .catch(err => alert(err));
  }

  //Func. to delete all items from cart(DB)
  public deleteAllItemsFromCart(): void {
    if (!this.cartItems || this.cartItems.length === 0) {
      alert("The cart  is empty already!");
      return;
    };
    if (confirm("Are you sure you want to delete all items from cart?")) {
      const cartID = (JSON.parse(localStorage.getItem("cart")))._id;
      this.itemsService.deleteAllItemsFromMongo(cartID).subscribe(
        data => { if (data) console.log(data) },
        err => alert(err.error)
      )
    }
    this.setCartItems();
  }

  // Func. delete one item from cart(DB)
  public deleteOneItemFromCart(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.itemsService.deleteItemFromMongo(id).subscribe(
        info => { if (info) console.log(info) },
        err => alert(err.error)
      )
      this.setCartItems();
    }
  }

  // Routing to order page
  public goToOrderPage(): void {
    if (!this.cartItems || this.cartItems.length === 0) {
      alert("The Cart is Empty!\nPlease select any item to order!")
    }
    else {
      this.router.navigate(['/home/payment']);
    };
  };
}
