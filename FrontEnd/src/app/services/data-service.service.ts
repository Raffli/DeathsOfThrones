import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public getDeathsByEpisode (id: number): Observable<any[]> {
    return this.http.get('http://localhost:8080/dot/death/episode?id='+ id)
      .map((response: Response) => response.json());
  }

  public getAllEpisodes (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/episode/all').map((response: Response) => response.json());
  }

  public getAllRegions (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/region/all').map((response: Response) => response.json());
  }

  public getAllPlaces (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/place/all').map((response: Response) => response.json());
  }

  public getAllMurderers (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/murder/all').map((response: Response) => response.json());
  }

  public getAllDeaths (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/death/all').map((response: Response) => response.json());
  }
}
