import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Products } from "../../models/product.model";
import { ProductsService } from "../../services/products.service";
import { LoginService } from "../../services/login.service"; 
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService, LoginService]
})
export class ProductsComponent implements OnInit {

  public product: Products;
  public status: string;
  public identity;
  public listProduct;
  public showData;
  public savedID;
  public selected;
  public url: string;
  key: string = '';
  reverse: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductsService,
    private _loginService: LoginService
  ) {
    this.product = new Products("", "", "", "", "");
    this.identity = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllProducts();
  }

  addProduct() {
    this._productService.addProduct(this.product).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.getAllProducts();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  updateProduct() {
    this._productService.updateProduct(this.showData).subscribe(
      response => {
        console.log(this.showData);
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.getAllProducts();
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  deleteProduct() {
    this._productService.deleteProduct(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getAllProducts();
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe(response => {
      this.listProduct = response;
      console.log(this.listProduct);
    });
  }

  getProduct(productID) {
    this._productService.getProduct(productID).subscribe(response => {
      console.log(response);
      this.showData = response;
    })
  }

  saveID(ID) {
    this.savedID = ID
  }

  LogOut(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

}
