import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTitle } from '@ionic/angular/standalone';
import { SummaryReportCardComponent } from '../summary-report-card/summary-report-card.component';

interface report {
  title:string;
  body:string;
  location:string;
  timestamp:Date;
  longitude:number;
  latitude:number;
  author:string;
  reportID:number;
  type:string;
}

@Component({
  selector: 'app-report-log',
  templateUrl: './report-log.component.html',
  styleUrls: ['./report-log.component.scss'],
  imports: [
    IonTitle,
    CommonModule,
    SummaryReportCardComponent,
  ]
})
export class ReportLogComponent  implements OnInit {
  @Input() type!:string;
  reports:report[] = [];

  constructor() { }

  ngOnInit() {


    if(this.type == "personal") {
      //TODO: retrieve user's reports
    }
    else if(this.type == "community") {
      //TODO: retrieve reports in user's city
    }
  }

}
