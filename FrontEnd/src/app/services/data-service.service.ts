import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataServiceService {

  constructor(private http: Http) { }

  public getDeathsByEpisode (id: number): Observable<any[]> {
    return this.http.get('http://localhost:8080/dot/death/episode?id='+ id)
      .map((response: Response) => response.json());
  }
}
