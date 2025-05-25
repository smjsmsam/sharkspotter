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

interface something {
  report: report;
  timestamp: Date;
}

@Component({
  selector: 'app-report-log',
  templateUrl: './report-log.component.html',
  styleUrls: ['./report-log.component.scss'],
  imports: [
    // IonTitle,
    CommonModule,
    SummaryReportCardComponent,
  ]
})
export class ReportLogComponent  implements OnInit {
  @Input() type!:string;
  reports:report[] = [];

  constructor(private service:ReportService) { }

  async grabReports() {
    let reportArray;
    if(this.type == "personal") {
      reportArray = await this.service.retrieveUserReports();
      reportArray.report.forEach((element: report) => {
        element.timestamp = new Date(element.timestamp);
      });
    }
    else if(this.type == "community") {
      //TODO: retrieve reports in user's city
      let resultArray = await this.service.retrieveCommunityReports();
      reportArray = {report: resultArray.allReports.map((entry: any) => entry.report)};
      reportArray.report.forEach((element: report) => {
        element.timestamp = new Date(element.timestamp);
      });
    }
    console.log(reportArray);
    this.reports = reportArray.report;
  }

  ngOnInit() {
    this.grabReports();
  }

}
