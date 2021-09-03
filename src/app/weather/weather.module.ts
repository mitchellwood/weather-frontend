import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherMapComponent } from './components/weather-map/weather-map.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WeatherComponent, 
    WeatherMapComponent, 
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule
  ]
})
export class WeatherModule { }
