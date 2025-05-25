import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTitle } from '@ionic/angular/standalone';
import { SummaryReportCardComponent } from '../summary-report-card/summary-report-card.component';
import { ReportService } from 'src/app/services/reports.service';

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

  constructor(private service:ReportService) { }

  async grabReports() {
    let resultJson;
    if(this.type == "personal") {
      resultJson = await this.service.retrieveUserReports();
    }
    else if(this.type == "community") {
      //TODO: retrieve reports in user's city
      resultJson = await this.service.retrieveUserReports();
    }
    console.log(resultJson.report);
    resultJson.report.forEach((element: report) => {
      element.timestamp = new Date(element.timestamp);
    });
    console.log(resultJson.report);
    this.reports = resultJson.report;
  }

  ngOnInit() {
    this.grabReports();
  }

}
