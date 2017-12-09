import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class LocationsService {

  constructor(private http: Http) { }

  public getAllLocations (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'place/all').map((response: Response) => response.json());
  }

  public getLocationByName (name: string): Observable<any[]> {
    return this.http.get(environment.baseUrl + 'place/name?name=' + name)
      .map((response: Response) => response.json());
  }

  public getAllLocationOnlyName (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'place/allNames').map((response: Response) => response.json());
  }






}
