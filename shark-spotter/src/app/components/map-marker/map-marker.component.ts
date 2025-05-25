import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonInput,
    IonTextarea,
    IonSelect,
    FormsModule,
    IonSelectOption,
  ],
})
export class MapMarkerComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ title: string; description: string; selectedType: string }>();


  selectedType: string = '';
  title: string = '';
  description: string = '';


  constructor() {}

  ngOnInit() {}

  onCloseClick() {
    this.close.emit();
  }

  onSelectChange(event: any) {
    console.log('Selected option:', event.detail.value);
  }

  onSaveClick() {
    console.log('Title:', this.title);
    console.log('Selected Pin Type:', this.selectedType);
    console.log('Description:', this.description);

    this.save.emit({
      title: this.title,
      description: this.description,
      selectedType: this.selectedType
    });

    this.close.emit(); // optionally close the card after save
  }

}
