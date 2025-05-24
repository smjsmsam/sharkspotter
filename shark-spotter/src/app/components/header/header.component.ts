import { Component, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonTitle,
  ]
})
export class HeaderComponent  implements OnInit {
  @Input() text!:string;

  constructor() { }

  ngOnInit() {}

}
