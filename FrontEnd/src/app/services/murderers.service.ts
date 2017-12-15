import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class MurderersService {

  constructor(private http: Http) { }

  public getAllMurderers (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'murder/all').map((response: Response) => response.json());
  }

  public getMurdererByName (name: string): Observable<any[]> {
    return this.http.get(environment.baseUrl + 'murder/name?name=' + name)
      .map((response: Response) => response.json());
  }

  public getAllMurderersOnlyName (): Observable <any[]> {
    return this.http.get(environment.baseUrl + 'murder/allNames').map((response: Response) => response.json());
  }

  public getMurdererKills (name: string): Observable<number> {
    return this.http.get(environment.baseUrl + 'death/killsByMurder?name=' + name)
      .map((response: Response) => response.json());
  }

  public getAllMurderersByKills (): Observable<any> {
    return this.http.get(environment.baseUrl + 'murder/allNamesByKills').map((response: Response) => response.json());
  }

  public getAllMurderersByOrigin (): Observable<any> {
    return this.http.get(environment.baseUrl + 'murder/allNamesByOrigins').map((response: Response) => response.json());
  }

}
