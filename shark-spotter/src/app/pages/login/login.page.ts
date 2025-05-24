import { Component, OnInit } from '@angular/core';
import { LoginCardComponent } from 'src/app/components/login-card/login-card.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    LoginCardComponent,
  ]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
