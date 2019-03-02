import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable()
export class OneproductService {
  constructor(private http: HttpClient) { }

  getProductById (id: string) {
    let formData = new FormData();
    formData.append("prodids", id);
    return this.http.post("http://dekoraceprodomov.cz/json/getproducts/" , formData);
}



  getAllProducts() {
    return this.http.post('http://dekoraceprodomov.cz/json/getproducttop/cz/10/20',
      {
        'pname': '...',
        'sklad': 'TEST',
      });
  }

  // getProductById (id: number) {
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.get("http://dekoraceprodomov.cz/itemsender/get_prodids_products/"+id)
  //           .pipe(map((product) => product[0]))
  //       .toPromise()
  //       .then(
  //         res => {
  //           console.log('resJson', res.json())
  //         }
  //         )
  //   });
  //   return promise;
  // }


}
