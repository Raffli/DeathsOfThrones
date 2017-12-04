import { Component, OnInit } from '@angular/core';
import {DeathsService} from '../services/deaths.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  private hasName: boolean;
  private data: any;

  constructor(private deathsService: DeathsService) { }

  ngOnInit() {
    this.deathsService.getAllDeaths()
      .subscribe(
        (data: any) => {
          this.hasName = true;
          this.data = data;
        }
      )
  }

}
