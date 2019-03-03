import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {AddToCartComponent} from "../shared/add-to-cart/add-to-cart.component";
import { MatAutocompleteModule, MatBadgeModule, MatFormFieldModule, MatIconModule, MatTableModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { ButtonsModule, CardsFreeModule, ModalModule, WavesModule } from 'angular-bootstrap-md';
import { OwlModule } from 'ngx-owl-carousel';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { AboutService } from './about/about.service';
import { BlogComponent } from './blog/blog.component';
import { FeatureComponent } from './feature/feature.component';
import { HomeRoutingModule } from './home-routing.module';
import { IntroOneComponent } from './intro-one/intro-one.component';
import { IntroThreeComponent } from './intro-three/intro-three.component';
import { IntroTwoComponent } from './intro-two/intro-two.component';
import { ListComponent } from './list/list.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PriceComponent } from './price/price.component';
import { PriceService } from './price/price.service';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { ScreenshotService } from './screenshot/screenshot.service';
import { TeamComponent } from './team/team.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { HomeOneComponent } from './versions/home-one/home-one.component';
import { HomeThreeComponent } from './versions/home-three/home-three.component';
import { HomeTwoComponent } from './versions/home-two/home-two.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TranslateModule } from "@ngx-translate/core";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MatInputModule } from '@angular/material';




// import { ServicesPageComponent } from '../services-page/services-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatBadgeModule,
    WavesModule,
    ButtonsModule,
    CardsFreeModule,
    MatListModule,
    MatFormFieldModule,
    ModalModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatSliderModule,
    TranslateModule,
    SwiperModule
  ],
  declarations: [
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    IntroOneComponent,
    IntroTwoComponent,
    IntroThreeComponent,
    AboutComponent,
    FeatureComponent,
    ScreenshotComponent,
    TeamComponent,
    BlogComponent,
    PriceComponent,
    TestimonialComponent,
    ListComponent,
		NewsletterComponent,
		ContactUsComponent
  ],
  providers: [AboutService, ScreenshotService, PriceService]
})
export class HomeModule {}
