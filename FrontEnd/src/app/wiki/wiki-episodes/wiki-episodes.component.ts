import { Component, OnInit } from '@angular/core';
import {EpisodesService} from '../../services/episodes.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-wiki-episodes',
  templateUrl: './wiki-episodes.component.html',
  styleUrls: ['./wiki-episodes.component.css']
})
export class WikiEpisodesComponent implements OnInit {

  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private episodesByAlphabet = new Array(this.alphabet.length);
  private allEpisodes: any[];
  private episodesLoaded: boolean;
  private showEntry: boolean;

  constructor(private episodesService: EpisodesService) { }

  ngOnInit() {
    this.episodesService.getAllEpisodesOnlyTitles()
      .subscribe(
        (data: any) => {
          this.allEpisodes = data;
          for (let i = 0; i < this.alphabet.length; i++) {
            this.episodesByAlphabet[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.alphabet.length; j++) {
              let firstLetter = data[i].charAt(0);
              firstLetter = firstLetter.toUpperCase();
              if (firstLetter == this.alphabet[j]) {
                this.episodesByAlphabet[j].push(data[i]);
              }
            }
          }
          this.episodesLoaded = true;
        }
      );
  }

  handleReturnFromEntry = function () {
    this.showEntry = false;
  };

  findNextAndPreviousEntry = function (entries, name) {
    let entryIndex;
    for (let i = 0; i < entries.length; i++) {
      if (entries[i] == name) {
        entryIndex = i;
        break;
      }
    }
    if (entries[entryIndex - 1]) {
      this.hasPreviousEntry = true;
      this.previousEntry = entries[entryIndex-1];
    } else {
      this.hasPreviousEntry = false;
      this.previousEntry = "bla";
    }
    if (entries[entryIndex + 1]) {
      this.hasNextEntry = true;
      this.nextEntry = entries[entryIndex+1];
    } else {
      this.hasNextEntry = false;
      this.nextEntry = "bla";
    }
    this.showEntry = true;
  };

  showPreviousEntry = function () {
    this.displayEntry(null, this.previousEntry);
  };

  showNextEntry = function () {
    this.displayEntry(null, this.nextEntry);
  };

  displayEntry = function (event, id) {
    let selectedTitle;
    if (id) {
      selectedTitle = this.allEpisodes[id];
    } else {
      selectedTitle = event.target.textContent;
    }

    this.episodesService.getEpisodeByTitle(selectedTitle).subscribe( (data: any) => {
      this.episodeData = data;
      this.episodeData.image = environment.baseUrl + 'image/imageByName?name=' + selectedTitle;
      this.findNextAndPreviousEntry(this.allEpisodes, selectedTitle);
    });

  };

}
