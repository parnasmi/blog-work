import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AllProductsComponent } from './all-products/all-products.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';


const routes: Routes = [
  {
    path: 'all-products',
    component: AllProductsComponent
  },
  {
    path: 'category',
    component: ProductsByCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EshopRoutingModule { }