import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AboutService } from '../about/about.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
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
        this.content = res[1];
        this.content.text = this._sanitizer.bypassSecurityTrustHtml(
          this.content.text
        );
      });
  }
}
