import { Component, OnInit } from '@angular/core';
import { ReportLogComponent } from 'src/app/components/report-log/report-log.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [
    ReportLogComponent,
  ]
})
export class ForumPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
