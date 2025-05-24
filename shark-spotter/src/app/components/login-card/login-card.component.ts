import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInput,
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonInput,
  ],
})
export class LoginCardComponent  implements OnInit {

  constructor(private router: Router) { }

  inputModel = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(event: CustomEvent) {
    const value = (event.target as HTMLIonInputElement).value ?? '';

    //remove non-alphanumeric characters
    const filteredValue = (value as string).replace(/[^a-zA-Z0-9]+/g, '');

    //sync state variable and component
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  goToHomePage() {
    //TODO: validate sign in

    this.router.navigate(['/tabs/home'])
  }

  ngOnInit() {}

}
