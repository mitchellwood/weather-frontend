import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RxCacheService } from 'ngx-rxcache';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  selectedLayer$ = new BehaviorSubject(undefined);

  constructor(
    private readonly cache: RxCacheService,
    private readonly http: HttpClient,
  ) { }

  private voronoiCache = this.cache.get<any>({
    id: '[Weather] voronoi'
  });

  voronoi$ = this.voronoiCache.value$;
  loadingVoronoi$ = this.voronoiCache.loading$;

  loadVoronoi() {
    this.voronoiCache.load(() => this.http.get<any>('api/weather/newvoronoi'));
  }

}
