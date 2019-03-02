import { Component, Input , OnInit } from '@angular/core';
import { Product } from "../../oneproduct/oneproduct.model";
import { AddProductService } from "./add-product.service";



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  cartProducts: Product[];
  totalValue = 0;


  constructor(private productService: AddProductService) { }

  ngOnInit() {
    this.getCartProduct();
  }


  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();
    this.totalValue = 0;
    this.cartProducts.forEach(product => {
      this.totalValue += +product.price;
    });
  }

  removeProductFromList (product: Product): void {
    this.productService.removeLocalCartProduct(product);
    this.getCartProduct();
  }

}
