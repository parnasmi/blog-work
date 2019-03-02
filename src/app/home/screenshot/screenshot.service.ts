import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {
  buffer,
  map,
  combineAll,
  mergeAll,
  toArray,
  concat
} from 'rxjs/operators';

@Injectable()
export class ScreenshotService {
  _blogerUrl = 'http://onlinekurzyaskoleni.cz/cz/json/blogers';
  _blogerLinks = 'http://onlinekurzyaskoleni.cz/cz/json/user_hashtags/';
  constructor(private http: HttpClient) {}

  getBlogerList(): Observable<any> {
    return this.http.get(this._blogerUrl);
  }

  getBlogersLinks(hashId: string[]): Observable<any> {
    const formData = new FormData();
    const idJson = JSON.stringify(hashId);
    // for (let i = 0; i < hashId.length; i++) {
    //   formData.append('hash_id', hashId[i]);
    // }
    formData.append('hash_id', idJson);
    return this.http.post(this._blogerLinks, formData);
  }
}
