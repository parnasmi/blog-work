import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';

@Injectable()
export class LanguageService {
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() selectedLanguage: EventEmitter<any> = new EventEmitter();
  @Output() headerSelectLanguage: EventEmitter<any> = new EventEmitter();
  private dataSubject = new ReplaySubject<any>(1);
  private langSubject = new ReplaySubject<any>(1);
  private homeSubject = new ReplaySubject<any>(1);
  data: Observable<any> = this.dataSubject.asObservable();
  langData: Observable<any> = this.langSubject.asObservable();
  home: Observable<any> = this.homeSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  setLanguage(lang: string = 'cz'): void {
    localStorage.setItem('lang', JSON.stringify(lang));
  }

  getLanguageFromLocalStorage() {
    const localLanguage = JSON.parse(localStorage.getItem('lang'));
    return of(localLanguage);
  }

  getTranslate(language: string): void {
    const translate = this.http.get(
      `http://backend.iamfood.life/${language}/json/static`
    );
    translate.subscribe(res => this.dataSubject.next(res));
  }

  headerLanguage(lang: string) {
    this.headerSelectLanguage.emit(lang);
    return this.langSubject.next(lang);
  }

  homeLangParam(lang) {
    return this.homeSubject.next(lang);
  }
}
