import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ]
})
export class HeaderComponent  implements OnInit {
  @Input() text!:string;

  constructor() { }

  ngOnInit() {}

}
