import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GeneralInformation } from 'src/app/services/generalInformation';
import { Title } from '@angular/platform-browser';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[];
  public categories: Category[];
  public searchValue: string;
  public kind: string;
  public user = new User();
  public cart = new Cart();
  public item = new Item();
  public isAdmin: boolean;
  public categoryID: string;



  public constructor(private productsService: ProductsService,
    private categoriesService: CategoryService,
    private generalInfo: GeneralInformation,
    private itemService: ItemsService,
    private router: Router,
    private redux: NgRedux<AppState>,
    title: Title) { title.setTitle("Home | Online Shopping") }


  public ngOnInit(): void {

    this.ifUserOnline();

    if (this.redux.getState().categories.length === 0) {
      this.categoriesService.getAllCategories();
    } else (this.categories = this.redux.getState().categories);

    this.redux.subscribe(() => {
      this.categories = this.redux.getState().categories;
    });

    if (this.redux.getState().products.length === 0) {
      this.getAllProducts('5dc0354c1d369b69d33dc3de', 'Milk & Eggs');
    } else {
      this.products = this.redux.getState().products;
    }

    this.redux.subscribe(() => {
      this.products = this.redux.getState().products;

    });

    this.generalInfo.newItemSubject.subscribe();

  }

  //func. checks if customer online
  public ifUserOnline(): void {
    let user = this.generalInfo.getUserFromls();
    if (!user) {
      alert("Please log-in");
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/login']);
      this.generalInfo.getCurrentUser(undefined);
    }
    else {
      if (user.typeOfUser.length > 10) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      };
    };
  }

  //func. to get all categories
  public getAllProducts(_id, kind) {
    this.ifUserOnline();
    this.kind = kind;
    this.productsService.getProductByCategory(_id);
  }

  //Product search func.
  public searchProduct(): void {

    if (this.searchValue === undefined) {
      alert('Please insert name of product!');
      return;
    };

    this.productsService.getProductForSearchRequest(this.searchValue)
      .subscribe(
        products => {
          if (products.length === 0) {
            alert("The item,that you're looking for, does not yet exist in store.")
          } else {
            this.products = products;
            this.kind = "Search Findings"
          }
        },
        err => console.log(err)
      );
  }

  //function to check the type of user, and then directs accordingly
  public checkPermissions(p): void {
    this.ifUserOnline();
    if (this.isAdmin) {
      this.addToAdminCart(p);
    } else {
      this.addToUserCart(p);
    }
  }

  //Function to add product to cart of admin
  public addToAdminCart(product): void {
    this.categoryID = product.category._id;
    this.onItemSubmit(product);
  }

  //adding item to user cart
  public addToUserCart(product): void {
    const amount = +prompt("please choose amount ");

    if (amount === 0) {
      alert('Please insert number of items!')
      return;
      // } else if (amount != (/^[0-9.,]+$/)) {
      //   alert("Please insert numeric a value!");
      //   return;
    } else if (amount < 0) {
      alert('Please insert the positive number!');
      return;
    };
    product.amount = amount;
    product.totalPrice = amount * product.priceOfProduct;
    this.item.productID = product._id;
    this.item.amount = amount;
    this.item.totalPrice = amount * product.priceOfProduct;
    this.item.cartID = (JSON.parse(localStorage.getItem("cart")))._id;

    this.sendItemToService(this.item);
    this.onItemSubmit(this.item);
  };

  //Func to add item to cart of user to DB
  public sendItemToService(item): void {
    this.itemService.addItemToMongo(item).subscribe(
      item => item
    ), err => alert(err.error)
  }

  public onItemSubmit(data): void {
    this.generalInfo.addItemToCart(data);
  };
}
