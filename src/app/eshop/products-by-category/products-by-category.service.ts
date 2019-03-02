import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class ProductsByCategoryService {
  constructor (private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.http.get('http://dekoraceprodomov.cz/json/getcategories/cz/20/10');
  }

  getCategoriesChild(id: number): Observable<any> {
    return this.http.get(`http://dekoraceprodomov.cz/json/geteshopmenuchilds/21/${id}`)
  }

  getProductsById(id): Observable<any> {
    return this.http.get(`http://dekoraceprodomov.cz/json/getproducttop/cz/10/20/${id}`)
  }

  getProductsBySearchKey(searchKey: string) {
    const formData = new FormData();
    formData.append('q', searchKey);
    return this.http.post(`http://dekoraceprodomov.cz/json/get_search_products/cz/100/0`, formData)
  }
}

