import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SettingsInterface } from '../interfaces/settings.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetSettingsService {
  private _sliderUrl = 'http://onlinekurzyaskoleni.cz/cz/json/settings/slider';
  constructor(private http: HttpClient) {}

  addSettingsFromDB(settingName: SettingsInterface): Observable<any> {
    return this.http.post(
      'http://onlinekurzyaskoleni.cz/cz/json/moresettings/',
      settingName
    );
  }

  sliderInfo(): Observable<any> {
    return this.http.get(this._sliderUrl);
  }
}
