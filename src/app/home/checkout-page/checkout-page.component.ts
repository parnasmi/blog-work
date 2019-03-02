import { Component, Input, OnInit } from '@angular/core';
import { AddProductService } from "../product-list/add-product.service";
import { Product } from "../../oneproduct/oneproduct.model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';



@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  totalValue = 0;
  cartProducts: Product[];

  checkOutForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),

    address: new FormGroup({
    homeAddress: new FormControl('', Validators.required),
    homeNumber: new FormControl('',Validators.required),
    city: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required)
    }),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6))
  })

  constructor(private productService: AddProductService,
              private toastyService:ToastyService, private toastyConfig: ToastyConfig)
  {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = "top-center";
  }

  ngOnInit() {
    this.getLocalCart();
    this.getCartProduct();
  }

  getLocalCart():void {
    this.cartProducts = this.productService.getLocalCartProducts();
  }

  getCartProduct(): void {
    this.cartProducts = this.productService.getLocalCartProducts();
    this.totalValue = 0;
    this.cartProducts.forEach(product => {
      this.totalValue += +product.price;
    });
  }

  onSubmit(){
    console.warn(this.checkOutForm.value);
    const toastOptions: ToastOptions = {
      title: "Success",
      msg: "Your order has been sent",
      showClose: true,
      timeout: 2500,
      theme: "bootstrap"
    };
    this.toastyService.success(toastOptions);
  }


}
