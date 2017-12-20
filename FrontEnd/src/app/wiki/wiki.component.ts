import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      if (params.name && params.category) {
        if (params.category == 'Death') {
          this.selectedIndex = 0;
          this.deathsChild.displayEntry(null, params.name);
        } else if (params.category == 'Murderer') {
          this.selectedIndex = 1;
          this.murderersChild.displayEntry(null, params.name);
        } else if (params.category == 'Location') {
          this.selectedIndex = 2;
          this.locationsChild.displayEntry(null, params.name);
        } else if (params.category == 'Episode') {
          this.selectedIndex = 3;
          this.episodesChild.displayEntry(null, params.name);
        }
      }
    });
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
