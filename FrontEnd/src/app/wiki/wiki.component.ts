import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data-service.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  private hasName: boolean;
  private data: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllDeaths()
      .subscribe(
        (data: any) => {
          this.hasName = true;
          this.data = data;
        }
      )
  }

}
