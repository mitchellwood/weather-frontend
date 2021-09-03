import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { WeatherComponent } from './weather.component';

const routes: Routes = [
  { 
    path: '', 
    component: WeatherComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
