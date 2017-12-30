import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeathsService} from '../../services/deaths.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-wiki-deaths',
  templateUrl: './wiki-deaths.component.html',
  styleUrls: ['./wiki-deaths.component.css']
})
export class WikiDeathsComponent implements OnInit {

  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private seasons = [1, 2, 3, 4, 5, 6];
  private deathsSorted;
  private deathsByAlphabet = new Array(this.alphabet.length);
  private deathsBySeasons = new Array(this.seasons.length);
  private deathsByLocation;
  private allDeaths: any [];
  private allDeathsByName: any[];
  private allDeathsByEpisode: any[];
  private allDeathsByLocation: any[];
  private deathsLoaded : boolean;
  private sortedBy: string;
  private byEpisodeHasBeenLoaded : boolean;
  private byLocationHasBeenLoaded : boolean;
  private allLocations: any[];
  private showEntry: boolean;
  private nextEntry : string;
  private hasNextEntry : boolean;
  private previousEntry : string;
  private hasPreviousEntry : boolean;
  private defaultBgColor: string;
  private selectedBgColor: string;
  private bgColorName : string;
  private bgColorEpisode : string;
  private bgColorLocation: string;
  private deadData: any[];
  private dataFromSearch: string;

  @Output()
  public showMurdererEntry = new EventEmitter<String>();
  @Output()
  public showEpisodeEntry = new EventEmitter<number>();
  @Output()
  public showLocationEntry = new EventEmitter<String>();

  constructor(private deathsService: DeathsService) { }

  ngOnInit() {
    this.deathsService.getAllDeathsOnlyName()
      .subscribe(
        (data: any) => {
          this.allDeathsByName = data;
          for (let i = 0; i < this.alphabet.length; i++) {
            this.deathsByAlphabet[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.alphabet.length; j++) {
              let firstLetter = data[i].charAt(0);
              firstLetter = firstLetter.toUpperCase();
              if (firstLetter == this.alphabet[j]) {
                this.deathsByAlphabet[j].push(data[i]);
              }
            }
          }

          this.deathsSorted = this.deathsByAlphabet;
          this.allDeaths = this.allDeathsByName;
          this.sortedBy = 'alphabet';
          this.deathsLoaded = true;

          this.defaultBgColor = '#969070';
          this.selectedBgColor = '#96641a';
          this.bgColorName = this.selectedBgColor;
          this.bgColorEpisode = this.bgColorLocation = this.defaultBgColor;

          if (this.dataFromSearch) {
            this.displayEntry(null, this.dataFromSearch);
          };
        }
      );
  }

  sortByName = function () {
    this.deathsSorted = this.deathsByAlphabet;
    this.allDeaths = this.allDeathsByName;
    this.sortedBy = 'alphabet';
    this.bgColorName = this.selectedBgColor;
    this.bgColorEpisode = this.bgColorLocation = this.defaultBgColor;
  };

  sortByEpisode = function () {
    this.bgColorEpisode = this.selectedBgColor;
    this.bgColorName = this.bgColorLocation = this.defaultBgColor;
    if (this.byEpisodeHasBeenLoaded) {
      this.allDeaths = this.allDeathsByEpisode;
      this.deathsSorted = this.deathsBySeasons;
      this.sortedBy = 'episode';
    } else {
      this.deathsService.getAllDeathsSortedByEpisode()
        .subscribe(
          (byEpisodeData: any) => {
            this.allDeathsByEpisode = [];
            for (let i = 0; i < this.seasons.length; i++) {
              this.deathsBySeasons[i] = [];
            }
            for (let i = 0; i < byEpisodeData.length; i++) {
              this.allDeathsByEpisode.push(byEpisodeData[i].name);
              for (let j = 0; j < this.seasons.length; j++) {
                if (byEpisodeData[i].season == this.seasons[j]) {
                  this.deathsBySeasons[j].push(byEpisodeData[i].name);
                }
              }
            }
            this.byEpisodeHasBeenLoaded = true;
            this.deathsSorted = this.deathsBySeasons;
            this.allDeaths = this.allDeathsByEpisode;
            this.sortedBy = 'episode';
          }
        );
    }
  };

  sortByLocation = function () {
    this.bgColorLocation = this.selectedBgColor;
    this.bgColorEpisode = this.bgColorName = this.defaultBgColor;
    if (this.byLocationHasBeenLoaded) {
      this.allDeaths = this.allDeathsByLocation;
      this.deathsSorted = this.deathsByLocation;
      this.sortedBy = 'location';
    } else {
      this.deathsService.getAllDeathsSortedByLocation()
        .subscribe( (data: any) => {
          this.allDeathsByLocation = [];
          this.allLocations = [];
          for (let i = 0; i < data.length; i++) {
            if (this.allLocations.length < 1) {
              this.allLocations.push(data[i].place);
            } else {
              for (let j = 0; j < this.allLocations.length; j++) {
                if (this.allLocations[j] == data[i].place) {
                  break;
                } else {
                  if (j == this.allLocations.length - 1) {
                    this.allLocations.push(data[i].place);
                  }
                }
              }
            }
          }
          this.deathsByLocation = new Array(this.allLocations.length);
          for (let i = 0; i < this.allLocations.length; i++) {
            this.deathsByLocation[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            this.allDeathsByLocation.push(data[i].name);
            for (let j = 0; j < this.allLocations.length; j++) {
              if (data[i].place == this.allLocations[j]) {
                this.deathsByLocation[j].push(data[i].name);
              }
            }
          }
          this.byLocationHasBeenLoaded = true;
          this.deathsSorted = this.deathsByLocation;
          this.allDeaths = this.allDeathsByLocation;
          this.sortedBy = 'location';
        });
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
    this.displayEntry(null, this.previousEntry);
  };

  showNextEntry = function () {
    this.displayEntry(null, this.nextEntry);
  };

  callMurdererEntry = function (event) {
    this.showMurdererEntry.emit(event);
  };

  callLocationEntry = function (event) {
    this.showLocationEntry.emit(event);
  };

  callEpisodeEntry = function (event) {
    this.showEpisodeEntry.emit(event);
  };

  displayEntry = function (event, name) {
    if (this.allDeaths == undefined) {
      this.dataFromSearch = name;
    }
    else {
      let selectedName;
      if (name) {
        selectedName = name;
      } else {
        selectedName = event.target.textContent;
      }
      this.deathsService.getDeathByName(selectedName).subscribe((data: any) => {
        this.deadData = data;
        this.deadData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
        this.findNextAndPreviousEntry(this.allDeaths, selectedName);
      });
    }
  };

}
