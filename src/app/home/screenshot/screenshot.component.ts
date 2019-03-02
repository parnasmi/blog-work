import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete
} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { ScreenshotService } from './screenshot.service';
import { take, startWith, map, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {
  blogers: [any];
  htags: any;
  selectedHtagsId: string[] = ['2'];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hashCtrl = new FormControl();
  filteredHashtags: Observable<string[]>;
  hashtags: string[] = ['sport'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  // Carousel Images
  public carouselImages = [
    {
      img:
        'https://blog.addthiscdn.com/wp-content/uploads/2015/11/logo-facebook.png'
    },
    {
      img:
        'http://www.transparentpng.com/thumb/logo-instagram/z75gfy-instagram-logo-png.png'
    },
    {
      img: `http://https://banner2.kisspng.com/20180403/ruw/+kisspng-
      youtube-computer-icons-logo-youtube-5ac3d2e1f14886.8605733815227829459883.jpg`
    },
    {
      img: `https://www.clipartmax.com/png/middle/35-351265_twitter-png-png-images-twitter-round-logo-png-transparent-background.png`
    }

  ];

  // Carousel Options
  public carouselOptions: any = {
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    center: true,
    autoplay: true,
    autoplayTimeout: 8000,
    responsive: {
      0: {
        items: 2
      },
      767: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  };

  constructor(
    private screenService: ScreenshotService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getBlogerList();
    this.http
      .get('http://onlinekurzyaskoleni.cz/cz/json/hashtag_list')
      .pipe(take(1))
      .subscribe(res => {
        this.htags = res;
        console.log(this.htags);
        this.filteredHashtags = this.hashCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) =>
            fruit ? this._filter(fruit) : this.htags.slice()
          )
        );
      });
  }

  getBlogerList(): void {
    this.screenService
      .getBlogerList()
      .pipe(take(1))
      .subscribe(res => (this.blogers = res));
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.hashtags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.hashCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.hashtags.indexOf(fruit);
    const ind = this.selectedHtagsId.indexOf(fruit);

    if (index >= 0) {
      this.hashtags.splice(index, 1);
      this.selectedHtagsId.splice(ind, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // @ts-ignore
    this.selectedHtagsId.push(event.option.value.id);
    // this.sendHtagId(this.selectedHtagsId);
    this.hashtags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.hashCtrl.setValue(null);
  }

  sendHtagId(): void {
    this.screenService
      .getBlogersLinks(this.selectedHtagsId)
      .pipe(take(1))
      .subscribe(res => {
        this.carouselImages = res;
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.htags.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
