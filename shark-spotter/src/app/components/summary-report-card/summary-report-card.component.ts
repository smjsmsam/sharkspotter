import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardTitle,
  IonText,
 } from '@ionic/angular/standalone';

@Component({
  selector: 'app-summary-report-card',
  templateUrl: './summary-report-card.component.html',
  styleUrls: ['./summary-report-card.component.scss'],
  imports: [
    IonCard,
    IonCardTitle,
    IonText,
  ]
})
export class SummaryReportCardComponent  implements OnInit {
  @Input() title!:string;
  @Input() text!:string;
  @Input() location!:string;
  @Input() time!:Date;

  constructor() { 
    if(!this.title) {
      this.title = "Report"
    }
    if(!this.text) {
      this.text = "No description";
    }
  }

  ngOnInit() {}

}
