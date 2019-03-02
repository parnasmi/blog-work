import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AboutService {
  _baseUrl = 'http://onlinekurzyaskoleni.cz/cz/json/settings/html_content';
  constructor(private http: HttpClient) {}

  aboutContent(): Observable<any> {
    return this.http.get(this._baseUrl);
  }
}
