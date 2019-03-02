import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {

  constructor(private http: HttpClient) { }

  getServiceFromDB () {
    return this.http.get('http://onlinekurzyaskoleni.cz/cz/json/pagelist/services')
      .pipe(map((data) => data));
  }

  getServiceSinglePageFromDB(id: number) {
    return this.http.get(`http://onlinekurzyaskoleni.cz/cz/json/page/${id}`)
      .pipe(map((data) => data));
  }

  sendDialogFormData(data) {
    return this.http.post('http://develop.mejcas.cz/cz/external_sendmail/ask_question/', data);
  }
}
