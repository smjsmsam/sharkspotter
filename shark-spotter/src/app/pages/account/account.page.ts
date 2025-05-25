import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

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
  username = "Username here :)"
  ;
  @ViewChild(ReportLogComponent) reportLog!: ReportLogComponent;

  constructor(private router: Router, private service:LoginService) { }

  async replaceUsername() {
    const userSession = await this.service.isLoggedIn();
    console.log(userSession);
    this.username = userSession.username;
  }

async logout() {
    const userSession = await this.service.logout();
    this.router.navigate(['/login']);

  }

  ngOnInit() {
    this.replaceUsername();
  }

  ionViewWillEnter() {
    if (this.reportLog) {
      this.reportLog.grabReports();
    }
  }
}
