import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    CommonModule,
    IonTabs, 
    IonTabBar,
    IonTabButton, 
    IonIcon,
  ]
})
export class TabsPage {
  public selectedTab = ""
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square });
  }

  onTabChange(event: {tab: string}) {
    this.selectedTab = event.tab;
  }
}
