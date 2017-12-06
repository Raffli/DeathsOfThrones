import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-episode-popup',
  templateUrl: './episode-popup.component.html',
  styleUrls: ['./episode-popup.component.css']
})
export class EpisodePopupComponent implements OnInit {

  @Input () public data: any[];

  constructor() { }

  ngOnInit() {
  }

}
