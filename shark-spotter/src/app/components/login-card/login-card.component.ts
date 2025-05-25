import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  // IonCardTitle,
  IonCardSubtitle,
  IonInput,
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    // IonCardTitle,
    IonCardSubtitle,
    IonInput,
  ],
})
export class LoginCardComponent  implements OnInit {

  constructor(private router: Router, private service:LoginService) { }

  inputModel = '';
  errorMsg = '';
  username = '';
  password = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(event: CustomEvent) {
    const value = (event.target as HTMLIonInputElement).value ?? '';

    //remove non-alphanumeric characters
    const filteredValue = (value as string).replace(/[^a-zA-Z0-9@._-]/g, '');

    //sync state variable and component
    this.ionInputEl.value = this.inputModel = filteredValue;
  }
  
  async goToHomePage() {
    try {
      // const userSession = await this.service.isLoggedIn();
      // console.log(userSession);

      const resultJson = await this.service.retrieveUser(this.username, this.password);
      if (resultJson.status == "success") {
        this.errorMsg = '';
        this.username = '';
        this.password = '';
        this.router.navigate(['/tabs/home']);
      } else {
        this.errorMsg = ':' + resultJson.errorMsg;
        console.log("Some error: " + resultJson.errorMsg);
      }
    } catch (err: any) {
      console.log(err);
      if (err.status === 0) {
        this.errorMsg = 'Server not running.';
      } else {
        if (err.error.message == "Invalid username") {
          const resultJson = await this.service.createUser(this.username, this.password);
          console.log(resultJson);
          this.errorMsg = resultJson.message + " Please log in again.";
        } else {
          this.errorMsg = 'Login failed: ' + err.error.message;
        }
      }
    }
  }

  ngOnInit() {}

}
