import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetMenuService {

  public results: Object;

  constructor(private http: HttpClient) { }

  // getMenuFromDB () {
  //   let promise = new Promise((resolve, reject) => {
  //     let apiURL = 'http://onlinekurzyaskoleni.cz/cz/json/menu/582';
  //     this.http.get(apiURL)
  //       .toPromise()
  //   });
  //   return promise;
  //   // return this.http.get(this._url);
  // }

  // getMenuFromDB () {
  //     let promise = new Promise((resolve, reject) => {
  //       let apiURL = 'http://onlinekurzyaskoleni.cz/cz/json/menu/582';
  //       this.http.get(apiURL)
  //         .toPromise()
  //     });
  //     return promise;
  //     // return this.http.get(this._url);
  //   }


  // http://onlinekurzyaskoleni.cz/cz/json/rootmenu/
  // http://onlinekurzyaskoleni.cz/cz/json/menu/582

  getRootMenuFromDB () {
    const _url = 'http://onlinekurzyaskoleni.cz/cz/json/rootmenu/';
    return this.http.get(_url);
  }

  getChildMenuFromDB () {
    const _url = 'http://onlinekurzyaskoleni.cz/cz/json/childsmenu/582';
    return this.http.get(_url);
  }



//   getMenuFromDB () {
//     const apiURL = 'http://onlinekurzyaskoleni.cz/cz/json/menu/582';
//     return this.http.get(apiURL)
//       .toPromise();
// }
}
