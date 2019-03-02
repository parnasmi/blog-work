import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatFormFieldModule, MatSnackBar } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwlModule } from 'ngx-owl-carousel';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { ToastyModule } from "ng2-toasty";
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';



import { HomeRoutingModule } from '../home/home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { OneproductService } from './oneproduct.service';
import { AddToCartComponent } from "../shared/add-to-cart/add-to-cart.component";
import {ProductListComponent} from "../home/product-list/product-list.component";
import {AddProductService} from "../home/product-list/add-product.service";
import { CdkTableModule } from "@angular/cdk/table";
import {MatListModule} from '@angular/material/list';
import { CheckoutPageComponent } from "../home/checkout-page/checkout-page.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.scss'],
})



@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule,
    NgxPaginationModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    MatTableModule,
    CdkTableModule,
    MatBadgeModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastyModule.forRoot(),
    NgZorroAntdModule
  ],
  declarations: [

    MatSnackBar,
    AddToCartComponent,
    ProductListComponent,
    CheckoutPageComponent
  ],
  providers: [OneproductService, AddProductService]
})

export class OneproductComponent implements OnInit,OnDestroy {

  productParams: any;
  product: any;
  id: string;
  subscribes: any;
  subId: Subscription;
  subParams: Subscription;
  isLoaded = false;



  constructor(private route: ActivatedRoute,
              private productService: OneproductService,
              private addProductService: AddProductService,
              private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = "top-center";
  }

  ngOnInit() {
    //Получает параметр id с адресной строки
    this.subscribes = this.route.params.subscribe(params =>
    this.id = params['id']);
    // let idJSON = JSON.stringify(this.id);

    // Подписывается на стрим и получает в data информацию о товарах
    this.subId = this.productService.getProductById(this.id)
      .subscribe((data) => {
        this.product = data[0];
        this.isLoaded = true;
      });

    this.subParams = this.productService.getProductById(this.id)
      .subscribe((data) => {
        console.log(data);
        // @ts-ignore
        if (data[0].params) {
        this.productParams = data[0].params[0].values;
        console.log(this.productParams);
        }
      });
  }

  addToCart (product) {
  this.addProductService.addToCart(product);
  // toasty config
    const toastOptions: ToastOptions = {
      title: "Success",
      msg: "Added to cart",
      showClose: true,
      timeout: 2500,
      theme: "bootstrap"
    };
    this.toastyService.success(toastOptions);
  }


  ngOnDestroy () {
    this.subId.unsubscribe();
    this.subParams.unsubscribe();
  }


}
