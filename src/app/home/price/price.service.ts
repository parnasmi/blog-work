import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, concat } from 'rxjs';
import { take, concatMap, toArray } from 'rxjs/operators';

@Injectable()
export class PriceService {
  _linksUrl = 'http://onlinekurzyaskoleni.cz/cz/json/links_list';
  _ipUrl = 'https://api.ipify.org/?format=json';
  _location = 'http://ip-api.com/json/';
  _blogerSumLink = 'http://onlinekurzyaskoleni.cz/cz/json/user_sum/';

  constructor(private http: HttpClient) {}

  getLinks(): Observable<Object> {
    return this.http.get(this._linksUrl);
  }

  userIpAddress(): Observable<Object> {
    // Get user location from user ip
    return from(
      this.http.get(this._ipUrl).pipe(
        // @ts-ignore
        concatMap(value => this.userLocation(value.ip)),
        toArray()
      )
    );
  }

  userLocation(ip: string): any {
    return this.http.get(this._location + ip);
  }

  blogerSum(id: string[]): Observable<any> {
    const formData = new FormData();
    formData.append('hash_id', JSON.stringify(id));
    return this.http.post(this._blogerSumLink, formData);
  }
}
