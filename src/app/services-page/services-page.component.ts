import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'angular-bootstrap-md';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';
import { Observable, Subscription } from 'rxjs';

import { GetServiceService } from '../shared/services/get-service.service';

export interface ServiceData {
  blocks: any;
  page: any;
  photos: any;
  texts: any[];
}

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [style({ transform: 'scale(2)' }), animate(150)]),
      transition(':leave', [
        group([
          animate(
            '0.2s ease',
            style({
              transform: 'translate(150px,25px)'
            })
          ),
          animate(
            '0.5s 0.2s ease',
            style({
              opacity: 0
            })
          )
        ])
      ])
    ])
  ]
})
export class ServicesPageComponent implements OnInit, OnDestroy {
  @ViewChild('frame') frameModal: ModalDirective;

  inputServices: any;
  inputServicesLoaded = false;
  sub1: Subscription;
  id: number;
  name: string;
  email: string;
  comment: string;
  dataFromModalSent = false;
  serviceData: ServiceData;

  sendServiceForm = new FormGroup({
    contactFormModalName: new FormControl('', Validators.required),
    contactFormModalEmail: new FormControl('', Validators.email),
    contactFormModalSubject: new FormControl('', Validators.required),
    contactFormModalMessage: new FormControl('', Validators.required)
  });

  constructor(
    private getService: GetServiceService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    console.log(route.snapshot.queryParamMap);
  }

  ngOnInit(): void {
    this.getServiceFromDB();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  getServiceFromDB(): void {
    this.sub1 = this.getService
      .getServiceFromDB()
      .subscribe((data: ServiceData) => {
        this.serviceData = data;
        this.inputServices = this.serviceData.texts;
        this.inputServicesLoaded = true;
      });
  }

  onSubmit() {
    const dataForSend = JSON.stringify(this.sendServiceForm.value);
    const formData = new FormData();
    formData.append(
      'contactFormModalName',
      this.sendServiceForm.get('contactFormModalName').value
    );
    formData.append(
      'contactFormModalEmail',
      this.sendServiceForm.get('contactFormModalEmail').value
    );
    formData.append(
      'contactFormModalSubject',
      this.sendServiceForm.get('contactFormModalSubject').value
    );
    formData.append(
      'contactFormModalMessage',
      this.sendServiceForm.get('contactFormModalMessage').value
    );
    console.log(formData);
    this.dataFromModalSent = true;
    return this.http
      .post(
        'http://develop.mejcas.cz/cz/external_sendmail/ask_question/',
        formData
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  hideModalForm(): void {
    this.frameModal.hide();
    setTimeout(() => {
      this.sendServiceForm.reset();
      this.dataFromModalSent = false;
    }, 1500);
  }
}
