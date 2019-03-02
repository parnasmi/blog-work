import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer,
  AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { WINDOW } from '../services/windows.service';
import { GetMenuService } from '../services/get-menu.service';
import { TranslateService } from '@ngx-translate/core';
// import * as $ from "jquery";
declare var $: any;

// export interface JQuery {
// 	priorityNav (options ?: any): any;
// }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public darkHeader = false;
  public menuItems: any[];
  rootMenuFromDB: any;
  rootMenuLoaded = false;
  childrenMenuFromDB: any;
  childrenMenuLoaded = false;

  testPath;
	priorityNav: any;
  // Inject Document object

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window,
    private getMenuService: GetMenuService,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('cz');
  }

  ngOnInit() {
    $.getScript('./assets/js/script.js');
    $.getScript('./assets/js/tilt.jquery.js');
    this.getRootMenuFromDB();
		this.getChildsMenuFromDB();
		
		$( document ).ready(function() {
			// $('.navbar-nav').flexMenu();
		});
  }

  //  getMenuFromService() {
  //   this.getMenuService.getMenuFromDB()
  //   .then((result) => {
  //       this.menuFromDB = result;
  //     })
  //     .catch((error) => console.error(error));
  //    console.log('results', this.menuFromDB);
  //  }

  //  getMenuFromDB () {
  //    this.getMenuService.getMenuFromDB()
  //    .then((data: any) => {
  //     this.menuFromDB = data;
  //     console.log('promise data', this.menuFromDB);
  //   })
  //   .catch((error) => console.error(error));
  // }

  // **get data with observables**
  getRootMenuFromDB() {
    this.getMenuService.getRootMenuFromDB().subscribe(data => {
      this.rootMenuFromDB = data;
      console.log('this.rootMenuFromDB', this.rootMenuFromDB);

      this.rootMenuLoaded = true;
      console.log(
        (this.testPath = '/' + this.rootMenuFromDB.page[3].controller)
      );
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
	}
	
	ngAfterViewInit() {
		$(function() {
			$('.main-header__list').flexMenu({
				linkText: 'Еще..'
			});
		});

	}
}
