import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CheckboxItem } from 'src/app/shared/checkbox/models/CheckboxItem';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

  userRolesOptions = new Array<any>();

  private userRoles = [
    { name: 'Temperature', checked: true },
    { name: 'Wind', checked: false },
    { name: 'Atmospheric pressure', checked: false }
  ];

  selectedLayer$ = this.weatherService.selectedLayer$;

  voronoi$ = this.weatherService.voronoi$;

  constructor(
    private readonly weatherService: WeatherService
  ) { }

  shareCheckedList(item: any[]) {
    console.log(item);
  }

}
