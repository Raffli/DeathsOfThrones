import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  @ViewChild('deathsChild') deathsChild;
  @ViewChild('murderersChild') murderersChild;
  @ViewChild('locationsChild') locationsChild;
  @ViewChild('episodesChild') episodesChild;

  private showEntry: boolean;

  private selectedIndex: number = 0;
  private selectedEntity : string;

  constructor() { }

  ngOnInit() {
    this.showEntry = false;
  }

  onChange($event) {
    if (this.showEntry) {
      this.showEntry = false;
    }
    this.selectedIndex = $event.index;
  }

  showMurdererEntry = function (event) {
    this.selectedIndex = 1;
    this.murderersChild.displayEntry(null, event);
  };

  showLocationEntry = function (event) {
    this.selectedIndex = 2;
    this.locationsChild.displayEntry(null, event);
  };

  showEpisodeEntry = function (event) {
    this.selectedIndex = 3;
    this.episodesChild.displayEntry(null, event);
  };

  showDeathEntry = function (event) {
    this.selectedIndex = 0;
    this.deathsChild.displayEntry(null, event);
  };




}
