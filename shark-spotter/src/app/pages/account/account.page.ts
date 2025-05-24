import { Component, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonButton,
} from '@ionic/angular/standalone';
import { SubmitReportCardComponent } from 'src/app/components/submit-report-card/submit-report-card.component';
import { ReportLogComponent } from 'src/app/components/report-log/report-log.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButton,
    SubmitReportCardComponent,
    ReportLogComponent,
  ]
})
export class AccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
