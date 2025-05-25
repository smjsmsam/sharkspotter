import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTitle } from '@ionic/angular/standalone';
import { SummaryReportCardComponent } from '../summary-report-card/summary-report-card.component';

interface report {
  title:string;
  text:string;
  location:string;
  time:Date;
  longitude:number;
  latitude:number;
  user:string;
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
    //delete this
    this.reports = [
      {
        title: "hi",
        text: "hi",
        location: "Irvine, CA",
        time: new Date(),
        latitude: 1234,
        longitude: 1234,
        user: ""
      },
      {
        title: "hi",
        text: "hi",
        location: "Irvine, CA",
        time: new Date(),
        latitude: 1234,
        longitude: 1234,
        user: ""
      }
    ];


    if(this.type == "personal") {
      //TODO: retrieve user's reports
    }
    else if(this.type == "community") {
      //TODO: retrieve reports in user's city
    }
  }

}
