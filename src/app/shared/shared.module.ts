import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Services
import { WINDOW_PROVIDERS } from './services/windows.service';
import { LandingFixService } from '../shared/services/landing-fix.service';
import { ToastyModule } from 'ng2-toasty';
import { TranslateModule } from '@ngx-translate/core';
// import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  exports: [CommonModule, HeaderComponent, FooterComponent, ToastyModule],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule,
    ToastyModule.forRoot(),
    TranslateModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  providers: [WINDOW_PROVIDERS, LandingFixService]
})
export class SharedModule {}
