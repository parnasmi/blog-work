import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetServiceService } from '../shared/services/get-service.service';
import { Subscription } from 'rxjs';

export interface ServiceData {
  blocks: any;
  page: any;
  photos: any;
}

@Component({
  selector: 'app-single-service-page',
  templateUrl: './single-service-page.component.html',
  styleUrls: ['./single-service-page.component.scss']
})
export class SingleServicePageComponent implements OnInit, OnDestroy {
  firstServiceBlock: string;
  secondServiceBlock: string;
  thirdServiceBlock: string;
  fourthServiceBlock: string;

  getIdSubscribes: Subscription;
  getServiceSubscribe: Subscription;
  id: number;
  pageFromDB: any;
  serviceLoaded = false;
  htmlTextToDecode: string;

  constructor(
    private route: ActivatedRoute,
    private getService: GetServiceService
  ) {}

  ngOnInit(): void {
    this.getIdSubscribes = this.route.params.subscribe(
      params => (this.id = +params['id'])
    );
    this.getServicePage();
  }

  getServicePage(): void {
    this.getServiceSubscribe = this.getService
      .getServiceSinglePageFromDB(this.id)
      .subscribe((data: ServiceData) => {
        if (data.blocks === undefined) {
          console.log('data', data);
          this.pageFromDB = data.page[0];
          console.log('pageFromDB', this.pageFromDB);
          this.htmlTextToDecode = this.pageFromDB.text;
          this.serviceLoaded = true;
        } else {
          this.pageFromDB = data.page[0];
          this.htmlTextToDecode = this.pageFromDB.text;
          this.firstServiceBlock = data.blocks[0];
          this.secondServiceBlock = data.blocks[1];
          this.thirdServiceBlock = data.blocks[2];
          this.fourthServiceBlock = data.blocks[3];
          this.serviceLoaded = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.getIdSubscribes.unsubscribe();
    this.getServiceSubscribe.unsubscribe();
  }
}
