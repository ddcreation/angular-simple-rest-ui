import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from './shared/app-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(AppSettings.languages[0]);
  }
}
