import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { MapMarkerComponent } from '../map-marker/map-marker.component';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [
    CommonModule,
    IonSearchbar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    MapMarkerComponent
  ]
})
export class MapComponent implements OnInit, AfterViewInit {
  map!: Map;
  showMarkerCard = false;

  // Declare vector source outside so it's accessible in the whole component
  private vectorSource = new VectorSource();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
  const markerLayer = new VectorLayer({
    source: this.vectorSource,
    style: new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'assets/Shark_Period_Map.png',
        scale: 0.03,
      }),
    }),
  });

  this.map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      markerLayer,
    ],
    view: new View({
      center: fromLonLat([-118.2437, 34.0522]),
      zoom: 10,
    }),
    controls: defaultControls(),
  });

  // Apply the color filter to the map's canvas after render
  this.map.once('rendercomplete', () => {
    const canvas = document.querySelector('#map canvas') as HTMLCanvasElement | null;
    if (canvas) {
      canvas.style.filter = 'sepia(30%) saturate(250%) hue-rotate(300deg) brightness(105%)';
      // canvas.style.opacity = '0.95'
    }

  });

  this.map.on('dblclick', (event) => {
    const marker = new Feature({
      geometry: new Point(event.coordinate),
    });
    this.vectorSource.addFeature(marker);
    console.log('Marker added at:', event.coordinate);
    this.showMarkerCard = true
  });
}

// Optional: manual close
  closeMarkerCard() {
    this.showMarkerCard = false;
  }

  // Used by the (close) output from <app-map-marker>
  onMarkerCardClose() {
    this.showMarkerCard = false;
  }

}