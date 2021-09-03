import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import * as d3 from 'd3-geo-voronoi';
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.scss']
})
export class WeatherMapComponent implements AfterViewInit, OnInit {
  private map;
  private overlay;
  private defaultBounds;

  private tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  voronoi$ = this.weatherService.voronoi$;

  constructor(
    private readonly http: HttpClient,
    private readonly weatherService: WeatherService
  ) {
    this.voronoi$.subscribe(data => {
      if (!data) return;
      // const newData = {
      //   ...data,
      //   features: data.features.map(x => x.geometry)
      // }
      // const geojson = d3.geoVoronoi()(newData).geoOrthographic();
      // console.log(geojson.polygons())
      this.overlay = new L.geoJSON(data, {
        style: (feature) => {
          return {
            color: "#999",
            weight: 1,
            fillColor: this.getColor(feature.properties.air_temp),
            fillOpacity: this.getOpacity(feature.properties.air_temp)
          }
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (event) => {
              let layer = event.target;
              layer.setStyle({
                  weight: 5,
                  color: '#666',
                  fillColor: "#000",
                  dashArray: '',
                  fillOpacity: 0.4
              });
              if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                  layer.bringToFront();
              }
            },
            mouseout: (event) => {
              let layer = event.target;
              if (this.weatherService.selectedLayer$.value !== layer) {
                this.overlay.resetStyle(layer);
                if (this.weatherService.selectedLayer$.value) this.weatherService.selectedLayer$.value.bringToFront();
              }
            },
            click: (event) => {
              let layer = event.target;
              if (this.weatherService.selectedLayer$.value !== layer) {
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    fillColor: "#000",
                    dashArray: '',
                    fillOpacity: 0.2
                });
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
                this.map.fitBounds(event.target.getBounds(), { padding: [200, 200] });
                this.weatherService.selectedLayer$.next(layer);
              } else {
                this.overlay.resetStyle(layer);
                this.map.fitBounds(this.defaultBounds);
                this.weatherService.selectedLayer$.next(undefined);
              }
            }
          });
        }
      });
      this.overlay.addTo(this.map);
    });
  }

  private getColor(temperature): string {
    return !temperature ? '#FFFFFF' : 
           temperature > 40 ? '#800026' :
           temperature > 35 ? '#BD0026' :
           temperature > 30 ? '#E31A1C' :
           temperature > 25 ? '#FC4E2A' :
           temperature > 20 ? '#FD8D3C' :
           temperature > 15 ? '#FEB24C' :
           temperature > 10 ? '#FED976' :
                              '#FFEDA0';
  }

  private getOpacity(temperature): number {
    return !temperature ? 0 : 0.6
  }

  ngOnInit(): void {
    this.weatherService.loadVoronoi();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.tiles.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-25.2744, 133.7751],
      zoom: 4
    });
    this.defaultBounds = this.map.getBounds()
  }
}
