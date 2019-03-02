import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AboutService } from './about.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  content: any; // <-- html content
  constructor(
    private aboutService: AboutService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getContent();
  }

  getContent(): void {
    this.aboutService
      .aboutContent()
      .pipe(take(1))
      .subscribe(res => {
        this.content = res[0];
        this.content.text = this._sanitizer.bypassSecurityTrustHtml(
          this.content.text
        );
      });
  }
}
