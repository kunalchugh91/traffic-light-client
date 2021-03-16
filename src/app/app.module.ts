import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { TrafficLightContainerComponent } from './traffic-light-container/traffic-light-container.component';
import { PedestrianWalkSignalComponent } from './pedestrian-walk-signal/pedestrian-walk-signal.component';

@NgModule({
  declarations: [
    AppComponent,
    TrafficLightComponent,
    TrafficLightContainerComponent,
    PedestrianWalkSignalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
