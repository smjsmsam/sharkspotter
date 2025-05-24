import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ReportLogComponent } from 'src/app/components/report-log/report-log.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    HeaderComponent,
    ReportLogComponent,
  ]
})
export class AccountPage implements OnInit {
  //TODO
  username = "Username here :)";

  constructor() { }

  ngOnInit() {
  }

}
