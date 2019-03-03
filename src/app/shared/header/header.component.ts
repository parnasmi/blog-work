import {
  Component,
  HostListener,
  Inject,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

import { WINDOW } from '../services/windows.service';
import { GetMenuService, IMenu } from '../services/get-menu.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../services/language.services";
import 'src/assets/js/flexmenu';

declare var $: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public darkHeader = false;
  rootMenuFromDB: IMenu;
  rootMenuLoaded = false;
  childrenMenuFromDB: any;
  childrenMenuLoaded = false;
  testPath;
  private language: any;

  // Inject Document object

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window,
    private getMenuService: GetMenuService,
    private http: HttpClient,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
  ) {
    translate.setDefaultLang('cz');
    this.activatedRoute.params.subscribe(lang => {
      this.languageService.homeLangParam(lang);
    });
    this.languageService.home.subscribe(res => {
      this.translate.use(res.language);
      this.language = res.language;
      this.getRootMenuFromDB(res.language);
    });
  }

  ngOnInit() {
    $.getScript('./assets/js/script.js');
    $.getScript('./assets/js/tilt.jquery.js');
    this.getChildsMenuFromDB();
  }

  // **get data with observables**
  getRootMenuFromDB(lang: string) {
    this.getMenuService.getRootMenuFromDB(lang).subscribe(data => {
      console.log(data);
      this.rootMenuFromDB = data;
      this.rootMenuLoaded = true;
    });
  }

  getChildsMenuFromDB() {
    this.getMenuService.getChildMenuFromDB().subscribe(data => {
      this.childrenMenuFromDB = data;
      console.log(this.childrenMenuFromDB);

      this.childrenMenuLoaded = true;
    });
  }

  // @HostListener Decorator
  @HostListener('window:scroll', [])

  onWindowScroll() {
    const number =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (number >= 60) {
      this.darkHeader = true;
    } else {
      this.darkHeader = false;
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.getRootMenuFromDB(language);
  }

  ngAfterViewInit() {
    $(window).load(function() {
      $('.main-header__list').flexMenu({
        linkText: 'Еще..'
      });
    });

  }
}

