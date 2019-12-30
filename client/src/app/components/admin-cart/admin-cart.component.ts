import { Component, OnInit } from '@angular/core';
import { GeneralInformation } from 'src/app/services/generalInformation';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-admin-cart',
  templateUrl: './admin-cart.component.html',
  styleUrls: ['./admin-cart.component.css']
})
export class AdminCartComponent implements OnInit {

  public product = new Product();
  public newProduct = new Product();
  public categories: Category[];
  public viewUpdate: boolean;
  public pForAction: string;
  public selectedFile: File;


  public constructor(private generalService: GeneralInformation,
    private categoryService: CategoryService,
    private productService: ProductsService,
    private redux: NgRedux<AppState>) { }


  ngOnInit() {
    this.showUpdateForm();

    this.getProductToChange();
    if (!this.product) {
      return;
    }

    this.redux.subscribe(() => {
      this.categories = this.redux.getState().categories;
    });

    if (this.redux.getState().categories.length === 0) {
      this.categoryService.getAllCategories();
    } else (this.categories = this.redux.getState().categories)

  }


  public showAddForm(): void {
    this.viewUpdate = false;
    this.pForAction = "Please insert details for a new Product!";
  }


  public showUpdateForm(): void {
    this.viewUpdate = true;
    this.pForAction = "Please select a product to make changes!"
  }


  public getProductToChange(): void {
    this.generalService.newItemSubject.subscribe(
      data => {
        this.product = data;
        this.product.category = data.category;
      },
      err => console.log(err.error)
    )
  }


  public updateProduct(): void {
    let productToUpdate = this.setUpdatedProduct();
    var user = this.generalService.getUserFromls();

    const fd: any = new FormData();
    fd.append('typeOfUser', user.typeOfUser);
    fd.append('_id', productToUpdate._id);
    fd.append('name', productToUpdate.name);
    fd.append('category', productToUpdate.category);
    fd.append('priceOfProduct', productToUpdate.priceOfProduct);

    if (this.selectedFile == undefined) {
      return;
    } else {
      fd.append('nameOfimgOfProduct', this.selectedFile, this.selectedFile.name)
    }

    this.productService.updateProductInMongoViaRedux(productToUpdate._id, fd);
  }


  public setUpdatedProduct() {
    var newProduct;
    for (let a = 0; a < this.categories.length; a++) {
      if (this.categories[a].categoryName === this.product.category) {
        newProduct = {
          _id: this.product._id,
          name: this.product.name,
          category: this.categories[a]._id,
          priceOfProduct: this.product.priceOfProduct,
          nameOfimgOfProduct: this.product.nameOfimgOfProduct
        };
      };
    };
    return newProduct;
  }

  public onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }


  public addProduct(): void {
    var user = this.generalService.getUserFromls();

    const fd: any = new FormData();
    fd.append('nameOfimgOfProduct', this.selectedFile, this.selectedFile.name);
    fd.append('typeOfUser', user.typeOfUser);
    fd.append('productName', this.newProduct.name);
    fd.append('productCategory', this.newProduct.category);
    fd.append('productPrice', this.newProduct.priceOfProduct);

    this.productService.addNewProductToMongo(fd);

  }
}
