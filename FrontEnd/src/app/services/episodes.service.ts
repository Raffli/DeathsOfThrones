import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EpisodesService {

  constructor(private http: Http) { }

  public getAllEpisodes (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/episode/all').map((response: Response) => response.json());
  }

  public getEpisodeById (id: number): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/episode/id?id=' + id).map((response: Response) => response.json());
  }

}
