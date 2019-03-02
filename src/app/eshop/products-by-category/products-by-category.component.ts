import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  group
} from '@angular/animations';

import { ProductsByCategoryService } from './products-by-category.service';
import { Subscription } from 'rxjs';
import { OneproductService } from '../../oneproduct/oneproduct.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate(200)
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
            '0.5s 0.2s ease',
            style({
              opacity: 0
            })
          )
        ])
      ])
    ])
  ]
})
export class ProductsByCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('alert') alert: ElementRef;

  productCategories: [any];
  sub1: Subscription;
  sub2: Subscription;
  productsById: any;
  productLoaded = false;
  searchInput: any;
  firstPage = 1;
  expansionPanelIsDisabled = true;

  constructor(private getCategoryService: ProductsByCategoryService) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.loadProducts();
  }

  getProductCategories(): void {
    this.sub1 = this.getCategoryService.getAllCategory().subscribe(data => {
      this.productCategories = data;
      console.log('categories', this.productCategories);
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  loadProducts(id: string = '21'): void {
    this.sub2 = this.getCategoryService
      .getProductsById(id)
      .subscribe(data => (this.productsById = data));
    this.productLoaded = true;
  }

  onKey(event: KeyboardEvent): void {
    // TODO: set debounce time & unsubscribe
    this.searchInput = (<HTMLInputElement>event.target).value;
    console.log(this.searchInput);
  }

  searchProduct(): void {
    this.getCategoryService
      .getProductsBySearchKey(this.searchInput)
      .subscribe(data => (this.productsById = data));
  }

  closeAlert(): void {
    this.alert.nativeElement.classList.remove('show');
  }

  sortByLower(): void {
    this.productsById.sort(this.sortEl1);
    console.log(this.productsById);
  }
  sortByHigher(): void {
    this.productsById.sort(this.sortEl2);
    console.log(this.productsById);
  }

  sortEl1(x, y): number {
    return x.price - y.price;
  }

  sortEl2(x, y): number {
    return y.price - x.price;
  }
}
