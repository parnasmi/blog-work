import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { BlogComponent } from './blog/blog.component';
import { ToastyModule } from 'ng2-toasty';

// import * as $ from 'jquery';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import {Observable} from "rxjs/Observable";
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalModule, InputsModule } from 'angular-bootstrap-md';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { OneproductComponent } from './oneproduct/oneproduct.component';
import { OneproductService } from './oneproduct/oneproduct.service';
import { AddToCartComponent } from './shared/add-to-cart/add-to-cart.component';
import { AddProductService } from './home/product-list/add-product.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  WavesModule,
  ButtonsModule,
  CardsFreeModule
} from 'angular-bootstrap-md';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CheckoutPageComponent } from './home/checkout-page/checkout-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetSettingsService } from './shared/services/get-settings.service';
import { GetServiceService } from './shared/services/get-service.service';
import { SingleServicePageComponent } from './single-service-page/single-service-page.component';
import { ModalWindowComponent } from './services-page/modal-window/modal-window.component';
import { GetMenuService } from './shared/services/get-menu.service';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ProductListComponent } from './home/product-list/product-list.component';
import { EshopModule } from './eshop/eshop.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeModule } from './home/home.module';
// import { ContactUsComponent } from './home/contact-us/contact-us.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    BlogComponent,
    OneproductComponent,
    AddToCartComponent,
    ProductListComponent,
    CheckoutPageComponent,
    SingleServicePageComponent,
    ModalWindowComponent,
    ServicesPageComponent,
    // ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    //    RouterModule.forRoot(rootRouterConfig, { useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    HttpClientModule,
    NgxPaginationModule,
    MatCardModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    WavesModule,
    ButtonsModule,
    CardsFreeModule,
    MatTooltipModule,
    ModalModule.forRoot(),
    InputsModule,
    MatDialogModule,
    ToastyModule.forRoot(),
    EshopModule,
    NgxGalleryModule,
		NgZorroAntdModule,
		HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    OneproductService,
    AddProductService,
    GetSettingsService,
    GetServiceService,
    NgbActiveModal,
    ModalWindowComponent,
    GetMenuService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddToCartComponent],
  exports: [ModalModule]
})
export class AppModule {}
