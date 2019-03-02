import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatTableModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

import { WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BreadcrumbModule, IconsModule } from 'angular-bootstrap-md';
import { AllProductsComponent } from './all-products/all-products.component';
import { EshopRoutingModule } from './eshop-routing.module';
import { OneproductService } from '../oneproduct/oneproduct.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { ProductsByCategoryService } from './products-by-category/products-by-category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EshopRoutingModule,
    NgxPaginationModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    RouterModule,
    SharedModule,
    NgxGalleryModule,
    NgZorroAntdModule,
    BreadcrumbModule,
    IconsModule,
    MatChipsModule,
    MatInputModule,
    WavesModule,
    InputsModule,
    ButtonsModule,
    MatExpansionModule,
    MatSortModule
  ],
  declarations: [AllProductsComponent, ProductsByCategoryComponent],
  providers: [OneproductService, ProductsByCategoryService]
})
export class EshopModule {}
