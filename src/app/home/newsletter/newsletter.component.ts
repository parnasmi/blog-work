import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { SettingsInterface } from "../../shared/interfaces/settings.interface";
import { GetSettingsService } from "../../shared/services/get-settings.service";

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  subscribeForm: FormGroup;
  allSettings;
  settingsLoaded = false;
  sub1: Subscription;
  settingName: SettingsInterface;

  constructor(private sf: FormBuilder,
              private getSettings: GetSettingsService) { }

  getSetting() {
    this.sub1 = this.getSettings.addSettingsFromDB(this.settingName)
      .subscribe((data) => {
        this.allSettings = data.emails;
        this.settingsLoaded = true;
      });

  }
  // Email Validator
  ngOnInit() {
    this.subscribeForm = this.sf.group({
      email: ['', Validators.email],
    })
    this.getSetting();
  }


}
