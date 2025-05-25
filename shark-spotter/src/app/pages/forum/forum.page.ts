import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportLogComponent } from 'src/app/components/report-log/report-log.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [
    ReportLogComponent,
    HeaderComponent,
  ]
})
export class ForumPage implements OnInit {

  @ViewChild(ReportLogComponent) reportLog!: ReportLogComponent;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.reportLog) {
      this.reportLog.grabReports();
    }
  }

}
