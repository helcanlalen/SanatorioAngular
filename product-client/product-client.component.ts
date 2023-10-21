import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { LoginService } from "../../services/login.service"; 
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-product-client',
  templateUrl: './product-client.component.html',
  styleUrls: ['./product-client.component.scss'],
  providers: [ProductsService, LoginService]
})
export class ProductClientComponent implements OnInit {

  public identity;
  public listProduct;
  public url: string;

  constructor(
    private _productService: ProductsService,
    private _loginService: LoginService,
    
  ) { 
    this.identity = this._loginService.getIdentityClient();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe(response => {
      this.listProduct = response;
      console.log(this.listProduct);
    });
  }

}
