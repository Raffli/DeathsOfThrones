import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MurderersService {

  constructor(private http: Http) { }

  public getAllMurderers (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/murder/all').map((response: Response) => response.json());
  }

  public getMurdererByName (name: string): Observable<any[]> {
    return this.http.get('http://localhost:8080/dot/murder/name=' + name)
      .map((response: Response) => response.json());
  }

  public getAllMurderersOnlyName (): Observable <any[]> {
    return this.http.get('http://localhost:8080/dot/murder/allNames').map((response: Response) => response.json());
  }

}
