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
  @Input() body!:string;
  @Input() location!:string;
  @Input() timestamp!:Date;
  @Input() author!:string;
  @Input() type!:string;

  constructor() { 
    if(!this.title) {
      switch (this.type) {
        case "incident":
          this.title = "Report";
          break;
        case "feminineproducts":
          this.title = "Feminine Products";
          break;
        case "bathroom":
          this.title = "Bathroom";
          break;
        default:
          this.title = "Unknown";
          break;
      }
    }
    if(!this.body) {
      this.body = "No description";
    }
  }

  ngOnInit() {}

}
