import { Component, OnInit } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [
    IonSearchbar,
  ]
})
export class MapComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
