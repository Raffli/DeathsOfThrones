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
  private seasons = [1, 2, 3, 4, 5, 6];
  private ratings = [8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9];
  private viewers = [3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000];
  private episodesSorted;
  private episodesByAlphabet = new Array(this.alphabet.length);
  private episodesBySeason = new Array(this.seasons.length);
  private episodesByRating = new Array(this.ratings.length);
  private episodesByViewer = new Array(this.viewers.length);
  private allEpisodes: any[];
  private allEpisodesByName: any[];
  private allEpisodesBySeason: any[];
  private allEpisodesByRating: any[];
  private allEpisodesByViewer: any[];
  private bySeasonHasBeenLoaded: boolean;
  private byRatingHasBeenLoaded: boolean;
  private byViewerHasBeenLoaded: boolean;
  private episodesLoaded: boolean;
  private showEntry: boolean;
  private sortedBy : string;
  private defaultBgColor: string;
  private selectedBgColor: string;
  private bgColorName : string;
  private bgColorSeason : string;
  private bgColorRating: string;
  private bgColorViewer: string;
  private episodeData: any[];

  constructor(private episodesService: EpisodesService) { }

  ngOnInit() {
    this.episodesService.getAllEpisodesOnlyTitles()
      .subscribe(
        (data: any) => {
          this.allEpisodesByName = data;
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
          this.episodesSorted = this.episodesByAlphabet;
          this.allEpisodes = this.allEpisodesByName;
          this.sortedBy = 'alphabet';
          this.episodesLoaded = true;

          this.defaultBgColor = '#969070';
          this.selectedBgColor = '#96641a';
          this.bgColorName = this.selectedBgColor;
          this.bgColorSeason = this.bgColorRating = this.bgColorViewer = this.defaultBgColor;
        }
      );
  }

  sortByName = function () {
    this.episodesSorted = this.episodesByAlphabet;
    this.sortedBy = 'alphabet';
    this.episodesLoaded = true;
    this.bgColorName = this.selectedBgColor;
    this.bgColorSeason = this.bgColorRating = this.bgColorViewer = this.defaultBgColor;
  };

  sortBySeason = function () {
    this.bgColorSeason = this.selectedBgColor;
    this.bgColorName = this.bgColorRating = this.bgColorViewer = this.defaultBgColor;
    if (this.bySeasonHasBeenLoaded) {
      this.allEpisodes = this.allEpisodesBySeason;
      this.episodesSorted = this.episodesBySeason;
      this.sortedBy = 'episode';
    } else {
      this.episodesService.getAllEpisodesBySeason()
        .subscribe(
          (data: any) => {
            this.allEpisodesBySeason = [];
            for (let i = 0; i < this.seasons.length; i++) {
              this.episodesBySeason[i] = [];
            }
            for (let i = 0; i < data.length; i++) {
              this.allEpisodesBySeason.push(data[i].title);
              for (let j = 0; j < this.seasons.length; j++) {
                if (data[i].season == this.seasons[j]) {
                  this.episodesBySeason[j].push(data[i].title);
                }
              }
            }
            this.bySeasonHasBeenLoaded = true;
            this.episodesSorted = this.episodesBySeason;
            this.allEpisodes = this.allEpisodesBySeason;
            this.sortedBy = 'season';
          }
        );
    }
  };

  sortByRating = function () {
    this.bgColorRating = this.selectedBgColor;
    this.bgColorSeason = this.bgColorName = this.bgColorViewer = this.defaultBgColor;
    if (this.byRatingHasBeenLoaded) {
      this.allEpisodes = this.allEpisodesByRating;
      this.episodesSorted = this.episodesByRating;
      this.sortedBy = 'rating';
    } else {
      this.episodesService.getAllEpisodesByRating()
        .subscribe(
          (data: any) => {
            this.allEpisodesByRating = [];
            for (let i = 0; i < this.ratings.length; i++) {
              this.episodesByRating[i] = [];
            }
            for (let i = 0; i < data.length; i++) {
              this.allEpisodesByRating.push(data[i].title);
              for (let j = 0; j < this.ratings.length; j++) {
                if (data[i].rating == this.ratings[j]) {
                  this.episodesByRating[j].push(data[i].title);
                }
              }
            }
            this.byRatingHasBeenLoaded = true;
            this.episodesSorted = this.episodesByRating;
            this.allEpisodes = this.allEpisodesByRating;
            this.sortedBy = 'rating';
          }
        );
    }
  };

  sortByViewer = function () {
    this.bgColorViewer = this.selectedBgColor;
    this.bgColorSeason = this.bgColorRating = this.bgColorName = this.defaultBgColor;
    if (this.byViewerHasBeenLoaded) {
      this.allEpisodes = this.allEpisodesByViewer;
      this.episodesSorted = this.episodesByViewer;
      this.sortedBy = 'viewer';
    } else {
      this.episodesService.getAllEpisodesByViewer()
        .subscribe(
          (data: any) => {
            this.allEpisodesByViewer = [];
            for (let i = 0; i < this.viewers.length; i++) {
              this.episodesByViewer[i] = [];
            }
            for (let i = 0; i < data.length; i++) {
              this.allEpisodesByViewer.push(data[i].title);
              for (let j = 0; j < this.viewers.length; j++) {
                if (data[i].viewers < this.viewers[j]) {
                  this.episodesByViewer[j].push(data[i].title);
                  break;
                }
              }
            }
            this.byViewerHasBeenLoaded = true;
            this.episodesSorted = this.episodesByViewer;
            this.allEpisodes = this.allEpisodesByViewer;
            this.sortedBy = 'viewer';
          }
        );
    }
  };

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
    console.log(this.previousEntry);
    this.displayEntry(null, this.previousEntry);
  };

  showNextEntry = function () {
    this.displayEntry(null, this.nextEntry);
  };

  displayEntry = function (event, id) {
    let selectedTitle;
    if (id) {
      if (typeof id == "string") {
        selectedTitle = id;
      } else {
        selectedTitle = this.allEpisodes[id];
      }
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
