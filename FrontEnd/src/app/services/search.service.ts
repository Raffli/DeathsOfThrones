import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  public searchDatabase (name: string): Observable<any[]> {
    return this.http.get(environment.baseUrl + 'search/findEntity?name=' + name)
      .map((response: Response) => response.json());
  }

}
