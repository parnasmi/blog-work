import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { fadeAnimation } from './shared/animation';
import { LanguageService } from "./shared/services/language.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  public language: any;

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.languageService.homeLangParam({language: 'cz'});
  }

  ngOnInit() {
    this.languageService.homeLangParam({language: 'cz'});
    this.languageService.langData.subscribe(res => {
      this.language = res;
    });
    this.languageService.getLanguageFromLocalStorage().subscribe(res => {
      if (res === null) {
        this.languageService.setLanguage();
        this.languageService.getTranslate('cz');
      }
    });
  }
}
