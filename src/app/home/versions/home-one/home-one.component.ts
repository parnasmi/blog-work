import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../../../shared/services/landing-fix.service';
import { LanguageService } from "../../../shared/services/language.services";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit, OnDestroy {
  public currentLang: any;
  public currentLanguage: string;
  public language: any;

  constructor(private fix: LandingFixService,
              private router: ActivatedRoute,
              private languageService: LanguageService) {

    this.languageService.homeLangParam({language: 'cz'});
    this.router.params.subscribe(lang => {
      this.currentLang = lang;
      this.languageService.homeLangParam(this.currentLang);
      this.languageService.setLanguage(this.currentLang);
      this.currentLanguage = lang['lang'];
    });
    this.languageService.langData.subscribe(res => {
      console.log(res);
      this.language = res;
    });

    this.languageService.getLanguageFromLocalStorage().subscribe(res => {
      if (res === null) {
        this.languageService.setLanguage();
      }
    });
  }

  ngOnInit() {
    this.fix.addFixOne();
    this.languageService
      .getLanguageFromLocalStorage()
      .pipe(take(1))
      .subscribe(res => {
        if (res === undefined) {
          this.languageService.setLanguage();
        }
      });
  }


  ngOnDestroy() {
    this.fix.removeFixOne();
  }

}
