import { Injectable } from '@angular/core';
import { Product } from "../../oneproduct/oneproduct.model";

@Injectable()
export class AddProductService {

  constructor() { }

  addToCart(data: Product): void {
    let addedProducts: Product[];
    addedProducts = JSON.parse(localStorage.getItem("avct_item")) || [];
    addedProducts.push(data);
    localStorage.setItem("avct_item", JSON.stringify(addedProducts));
  }

  getLocalCartProducts(): Product[] {
    return JSON.parse(localStorage.getItem("avct_item")) || [];
  }

  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));
    console.log(products);

    for ( let i = 0; i < products.length; i++ ) {
      if (products[i].id === product.id) {
        products.splice(i,1);
        break;
      }
    }
    localStorage.setItem("avct_item", JSON.stringify(products));
  }
}
