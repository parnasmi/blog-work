import { Routes, RouterModule } from '@angular/router';

import { DemoComponent } from './demo/demo.component';
import { BlogComponent } from './blog/blog.component';
import { OneproductComponent } from './oneproduct/oneproduct.component';
import { ProductListComponent } from './home/product-list/product-list.component';
import { CheckoutPageComponent } from './home/checkout-page/checkout-page.component';
import { SingleServicePageComponent } from './single-service-page/single-service-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: ':language/home',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'oneproduct/:id',
    component: OneproductComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'checkout-page',
    component: CheckoutPageComponent
  },
  {
    path: 'single-service-page/:id',
    component: SingleServicePageComponent
  },

  {
    path: ':language/home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'blog',
    component: BlogComponent,
    loadChildren: './blog/blog.module#BlogModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: 'services',
    component: ServicesPageComponent
  },
  {
    path: 'products',
    loadChildren: './eshop/eshop.module#EshopModule'
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: '**',
    redirectTo: ':language/home'
  }
];
