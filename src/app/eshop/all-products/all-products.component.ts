import { Component, OnInit } from '@angular/core';
import {
  animate,
  group,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

import { OneproductService } from '../../oneproduct/oneproduct.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate(350)
      ]),
      transition(':leave', [
        group([
          animate(
            '0.2s ease',
            style({
              transform: 'translate(150px,25px)'
            })
          ),
          animate(
            '0.3s 0.2s ease',
            style({
              opacity: 0
            })
          )
        ])
      ])
    ])
  ]
})
export class AllProductsComponent implements OnInit {
  loading = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  allProducts: any;
  firstPage = 0;

  constructor(private getAllProductsService: OneproductService) {}

  ngOnInit() {
    this.getAllProducts();

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/aboutus.png',
        medium: 'assets/images/aboutus.png',
        big: 'assets/images/aboutus.png'
      },
      {
        small: 'assets/images/aboutus.png',
        medium: 'assets/images/aboutus.png',
        big: 'assets/images/aboutus.png'
      },
      {
        small: 'assets/images/aboutus.png',
        medium: 'assets/images/aboutus.png',
        big: 'assets/images/aboutus.png'
      },
      {
        small: 'assets/images/aboutus.png',
        medium: 'assets/images/aboutus.png',
        big: 'assets/images/aboutus.png'
      }
    ];
  }

  getAllProducts(): void {
    this.allProducts = this.getAllProductsService.getAllProducts();
    this.loading = true;
    console.log(this.allProducts);
  }
}
