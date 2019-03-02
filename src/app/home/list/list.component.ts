import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http"; // єтот клиент работает с удаленными данными

import 'rxjs/add/operator/toPromise';

// описание компонента и егшо файлов
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit {

  // firstPage = 1; // pagination first page
  // result: any; // определение переменной куда сохранятся данные
  private name: string;

  public blogCarousel: any = {
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
        margin: 5,
        nav: false,
      },
      600: {
        items: 1,
        margin: 0,
        nav: false,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 4
      }
    }
  }

  constructor() {
  }


  ngOnInit() {

  }


  // ngOnInit() {
  //   this.result=this.http.post("http://dekoraceprodomov.cz/prices/getproducttop",
  //         {
  //             "pname": "...",
  //             "sklad": "TEST",

  //         })
  //   console.log(this.result);
  //   this.name='Test name';
  // }


  // Blog Carousel Options
  

}
