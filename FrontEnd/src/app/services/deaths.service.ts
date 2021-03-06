import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from "../../environments/environment";
import {ObjectUnsubscribedError} from 'rxjs/Rx';

@Injectable()
export class DeathsService {

  constructor(private http: Http) { }

  public getDeathsByEpisode (id: number): Observable<any[]> {
    return this.http.get(environment.baseUrl +'death/episode?id=' + id)
      .map((response: Response) => response.json());
  }

  public getAllDeaths (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/all').map((response: Response) => response.json());
  }

  public getDeathByName (name: string): Observable<any[]> {
    return this.http.get(environment.baseUrl + 'death/name?name=' + name)
      .map((response: Response) => response.json());
  }

  public getAllDeathsOnlyName (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/allNames').map((response: Response) => response.json());
  }

  public getAllDeathsByMurderer (name: string): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/murder?name=' + name)
      .map((response: Response) => response.json());
  }

  public getAllDeathsSortedByEpisode (): Observable<any[]> {
    return this.http.get(environment.baseUrl + 'death/allByEpisodeId').map((response: Response) => response.json());
  }

  public getAllDeathsSortedByLocation (): Observable<any[]> {
    return this.http.get(environment.baseUrl + 'death/allByPlace').map((response: Response) => response.json());
  }

  public getDeathsBySeason (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/deathCountBySeason').map((response: Response) => response.json());
  }

  public getDeadliestEpisodes (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/topFiveDeathEpisodes').map((response: Response) => response.json());
  }

  public getDeadliestPlaces (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/topFiveDeathPlaces').map((response: Response) => response.json());
  }

  public getDeadliestDirectors (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/topFiveDeathDirectors').map((response: Response) => response.json());
  }

  public getDeadliestWriters (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'death/topFiveDeathWriters').map((response: Response) => response.json());
  }

}
