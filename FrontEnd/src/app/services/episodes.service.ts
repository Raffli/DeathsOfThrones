import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class EpisodesService {

  constructor(private http: Http) { }

  public getAllEpisodes (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'episode/all').map((response: Response) => response.json());
  }

  public getEpisodeByTitle (title: string): Observable<any[]> {
    return this.http.get(environment.baseUrl + 'episode/title?title=' + title)
      .map((response: Response) => response.json());
  }

  public getAllEpisodesOnlyTitles (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'episode/allTitlesByAbc').map((response: Response) => response.json());
  }

  public getEpisodeById (id: number): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'episode/id?id=' + id).map((response: Response) => response.json());
  }

  public getAllEpisodesBySeason (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'episode/allTitles').map((response: Response) => response.json());
  }

  public getAllEpisodesByRating (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'episode/byImdb').map((response: Response) => response.json());
  }

  public getAllEpisodesByViewer (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'episode/byViewer').map((response: Response) => response.json());
  }

  public getAvgViewerPerSeason (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'episode/avgViewerSeason').map((response: Response) => response.json());
  }

}
