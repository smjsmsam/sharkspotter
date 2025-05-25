import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
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
import type { Coordinate } from 'ol/coordinate';
import { ReportService } from 'src/app/services/reports.service';
import { SummaryReportCardComponent } from '../summary-report-card/summary-report-card.component';



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
    MapMarkerComponent,
    SummaryReportCardComponent,
    IonButton
  ]
})
export class MapComponent implements OnInit, AfterViewInit {
  map!: Map;
  showMarkerCard = false;
  showReport = false;

  // Declare vector source outside so it's accessible in the whole component
  private vectorSource = new VectorSource();
  private markerCount = 0;
  private tempCoords: Coordinate | null = null;
  constructor(private service:ReportService) {}

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
    this.showMarkerCard = true;
    this.tempCoords = event.coordinate;
  // this.markerCount++;
  //   const marker = new Feature({
  //     geometry: new Point(event.coordinate),
  //   });
  //   marker.setId(this.markerCount);
  //   marker.set('id', this.markerCount);
  //   this.vectorSource.addFeature(marker);
  //   console.log('Marker added at:', event.coordinate);
    
  });

  



  this.map.on('click', (event) => {
  const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
  if (feature) {
    console.log('Icon clicked!', feature);
    console.log('Marker', feature.getId());
    this.showReport = true;
    // You could show a popup, open a card, etc.
  } else {
    console.log('Clicked on map but not on icon.');
  }
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

  onReportClose() {
    this.showReport = false;
  }


  onPinSave(pinData: { title: string; description: string; selectedType: string }) {
    if (!this.tempCoords) return;
    if (!pinData.selectedType) return;
    if (pinData.selectedType === 'Incident' && !pinData.title) return;
    if (pinData.selectedType === 'Incident' && !pinData.description) return;

    console.log('HELPPP');
    this.markerCount++;
    const marker = new Feature({
      geometry: new Point(this.tempCoords),
      title: pinData.title,
      description: pinData.description,
      pinType: pinData.selectedType,
    });
    marker.setId(this.markerCount);
    marker.set('id', this.markerCount);

    let jsonObject = JSON.stringify({
      'title': pinData.title,
      'body': pinData.description,
      'reportID': this.markerCount,
      'longitude': 1,
      'latitude': 1,
      'location': 'N/A',
      'type': pinData.selectedType,
    });
    this.insertReport(jsonObject);

    let iconSrc = '';
    switch (pinData.selectedType) {
      case 'FeminineProducts':
        iconSrc = 'assets/Shark_Period_Map.png';
        break;
      case 'Bathroom':
        iconSrc = 'assets/Shark_Toilet_Map.png';
        break;
      case 'Incident':
        iconSrc = 'assets/Shark_Incident_Map.png';
        break;
      default:
        iconSrc = 'assets/Shark_Period_Map.png';
    }

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: iconSrc,
          scale: 0.03,
        }),
      })
    );

    this.vectorSource.addFeature(marker);

    this.showMarkerCard = false;
    this.tempCoords = null;
}

async insertReport(data: string) {

  const resultJson = await this.service.addReport(JSON.parse(data));
  console.log(resultJson);
}
  
}