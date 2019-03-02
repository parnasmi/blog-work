import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { GetSettingsService } from '../../shared/services/get-settings.service';
import { SettingsInterface } from '../../shared/interfaces/settings.interface';
import { Subscription } from 'rxjs';
import { GetServiceService } from '../../shared/services/get-service.service';
import { take } from 'rxjs/operators';
import { OwlCarousel } from 'ngx-owl-carousel';

export interface ISliderArr {
  img: string;
  short_text: string;
}

@Component({
  selector: 'app-intro-one',
  templateUrl: './intro-one.component.html',
  styleUrls: ['./intro-one.component.scss']
})
export class IntroOneComponent implements OnInit, OnDestroy {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  allSettings: any;
  emailsSetting: SettingsInterface;
  sub1: Subscription;
  sub2: Subscription;
  settingName: SettingsInterface;
	public sliderArr: ISliderArr[];
	
	sliderPics: ISliderArr[] = [
		{ "short_text": "lorem1", "img": "pic-banner-1.png" },
		{ "short_text": "lorem2", "img": "pic-banner-2.png" },
		{ "short_text": "lorem3", "img": "pic-banner-3.png" },
		{ "short_text": "lorem4", "img": "pic-banner-4.png" },
		{ "short_text": "lorem5", "img": "pic-banner-5.png" }
	];
	
  // carousel
  public teamCarousel: any = {
    loop: true,
    dots: true,
    slideSpeed: 1000,
    paginationSpeed: 1000,
    rewindSpeed: 1000,
    items: 1,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    animateIn: 'fadeInLeft',
    nav: false,
    navText: [
      '<i class=\'fa fa-caret-left\'></i>',
      '<i class=\'fa fa-caret-right\'></i>'
    ]
  };

  constructor(private getSettings: GetSettingsService) {}
  // this._sanitizer.bypassSecurityTrustHtml('...some hmtl ...')
  ngOnInit() {
    this.getSetting();
    this.sliderInfo();
  }

  getSetting() {
    this.sub1 = this.getSettings
      .addSettingsFromDB(this.settingName)
      .subscribe(data => {
        this.allSettings = data.emails;
      });
  }

  sliderInfo(): void {
    this.sub2 = this.getSettings
      .sliderInfo()
      .pipe(take(1))
      .subscribe(res => {
        this.sliderArr = res;
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
