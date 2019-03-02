import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PriceService } from './price.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  animations: [
    trigger('valueAnimation', [
      transition(
        ':increment',
        group([
          query(
            ':enter',
            [
              style({ color: 'green', fontSize: '50px' }),
              animate('0.8s ease-out', style('*'))
            ],
            { optional: true }
          )
        ])
      ),
      transition(
        ':decrement',
        group([
          query(
            ':enter',
            [
              style({ color: 'red', fontSize: '50px' }),
              animate('0.8s ease-out', style('*'))
            ],
            { optional: true }
          )
        ])
      )
    ])
  ]
})
export class PriceComponent implements OnInit {
  linksList: any;

  czFlag: boolean;
  deFlag: boolean;
  usFlag: boolean;
  userIp: string;
  hashtagsList: Observable<object>;
  flagList: Observable<object>;
  socialLinksForm: FormGroup;
  flagsForm: FormGroup;
  hashTagForm: FormGroup;
  sliderValue = 0;

  divider = 1000;
  blogersNumber: string;
  currencyFactor = 1;
  // Pricing Carousel
  public price = [
    {
      type: 'basic',
      title: 'Only the basic features',
      price: 50,
      duration: 'per year',
      feature: this._sanitizer
        .bypassSecurityTrustHtml(`<li>1 GB of space</li><li>real time sync</li><li>unlimited attachment</li>
        <li>customize theme</li><li>priority email support</li>`)
    },
    {
      type: 'Standard',
      title: 'Take it to the next level',
      price: '$100',
      duration: 'per year',
      feature: this._sanitizer
        .bypassSecurityTrustHtml(`<li>1 GB of space</li><li>real time sync</li><li>unlimited attachment</li>
        <li>customize theme</li><li>priority email support</li>`)
    },
    {
      type: 'Custom',
      title: 'Our biggest plan',
      price: '$150',
      duration: 'per year',
      feature: this._sanitizer
        .bypassSecurityTrustHtml(`<li>1 GB of space</li><li>real time sync</li><li>unlimited attachment</li>
        <li>customize theme</li><li>priority email support</li>`)
    }
  ];

  // Pricing Carousel Options
  public pricingCarousel: any = {
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
        dots: true,
        margin: 0
      },
      600: {
        items: 1,
        dots: true,
        margin: 0
      },
      768: {
        items: 2,
        dots: true
      },
      992: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  };

  // DomSanitizer for safe html content.
  constructor(
    private _sanitizer: DomSanitizer,
    private priceService: PriceService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.priceService
      .getLinks()
      .pipe(take(1))
      .subscribe(res => {
        this.linksList = res;
      });

    this.getUserIP();
    this.hashtagsList = this.http.get(
      'http://onlinekurzyaskoleni.cz/cz/json/hashtag_list'
    );
    this.flagList = this.http.get(
      'http://onlinekurzyaskoleni.cz/cz/json/language_list'
    );

    this.socialLinksForm = this.fb.group({
      checkedLinks: this.fb.array([])
    });
    this.flagsForm = this.fb.group({
      checkedFlags: this.fb.array([])
    });
    this.hashTagForm = this.fb.group({
      checkedHashTags: this.fb.array([])
    });
  }

  sendOptions(): void {
    this.priceService
      .blogerSum(this.socialLinksForm.value.checkedLinks)
      .subscribe(res => {
        this.price[0].price =
          (this.sliderValue / this.divider) * +res * this.currencyFactor;
      });
  }

  getUserIP(): void {
    this.priceService.userIpAddress().subscribe(res => {
      // set flag state to check
      switch (res[0].country) {
        case 'Czech':
          this.czFlag = true;
          break;
        case 'Germany':
          this.deFlag = true;
          break;
        case 'United Kingdom':
          this.usFlag = true;
          break;
        default:
          this.czFlag = true;
      }
    });
  }

  onChangeLinks(id: string, isChecked: boolean) {
    const idFromArray = <FormArray>this.socialLinksForm.controls.checkedLinks;

    if (isChecked) {
      idFromArray.push(new FormControl(id));
      console.log(this.socialLinksForm.value);
    } else {
      const index = idFromArray.controls.findIndex(x => x.value === id);
      idFromArray.removeAt(index);
    }
  }

  onChangeFlags(id: string, isChecked: boolean) {
    const idFromArray = <FormArray>this.flagsForm.controls.checkedFlags;

    if (isChecked) {
      idFromArray.push(new FormControl(id));
      console.log(this.flagsForm.value);
    } else {
      const index = idFromArray.controls.findIndex(x => x.value === id);
      idFromArray.removeAt(index);
    }
  }

  onChangeHashtags(id: string, isChecked: boolean) {
    console.log(id);

    const idFromArray = <FormArray>this.hashTagForm.controls.checkedHashTags;

    if (isChecked) {
      idFromArray.push(new FormControl(id));
      console.log(this.hashTagForm.value);
    } else {
      const index = idFromArray.controls.findIndex(x => x.value === id);
      idFromArray.removeAt(index);
    }
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  onInputChange(event): void {
    console.log(event);
  }
}
