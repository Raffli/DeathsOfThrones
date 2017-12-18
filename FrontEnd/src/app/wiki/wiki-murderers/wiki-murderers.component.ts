import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeathsService} from '../../services/deaths.service';
import {MurderersService} from '../../services/murderers.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-wiki-murderers',
  templateUrl: './wiki-murderers.component.html',
  styleUrls: ['./wiki-murderers.component.css']
})
export class WikiMurderersComponent implements OnInit {

  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private kills = [1, 2, 3, 4, 5, 6, 7];
  private origins: any[];
  private murderersByAlphabet = new Array(this.alphabet.length);
  private murderersByKills = new Array(this.kills.length);
  private murderersByOrigin;
  private murderersSorted;
  private sortedBy: string;
  private allMurderers: any[];
  private allMurderersByName : any[];
  private allMurderersByKills: any[];
  private allMurderersByOrigin: any[];
  private murderersLoaded: boolean;
  private byKillsHasBeenLoaded: boolean;
  private byOriginHasBeenLoaded: boolean;
  private showEntry: boolean;
  private nextEntry : string;
  private hasNextEntry : boolean;
  private previousEntry : string;
  private hasPreviousEntry : boolean;
  private defaultBgColor: string;
  private selectedBgColor: string;
  private bgColorName : string;
  private bgColorKills : string;
  private bgColorOrigin: string;
  private murdererData: any[];
  private dataFromSearch: string;

  @Output()
  public showDeathEntry = new EventEmitter<String>();

  constructor(private deathsService: DeathsService, private murderersService: MurderersService) { }

  ngOnInit() {
    this.murderersService.getAllMurderersOnlyName()
      .subscribe(
        (data: any) => {
          this.allMurderersByName = data;
          for (let i = 0; i < this.alphabet.length; i++) {
            this.murderersByAlphabet[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.alphabet.length; j++) {
              let firstLetter = data[i].charAt(0);
              firstLetter = firstLetter.toUpperCase();
              if (firstLetter == this.alphabet[j]) {
                this.murderersByAlphabet[j].push(data[i]);
              }
            }
          }
          this.murderersLoaded = true;
          this.murderersSorted = this.murderersByAlphabet;
          this.allMurderers = this.allMurderersByName;
          this.sortedBy = 'alphabet';
          this.defaultBgColor = '#969070';
          this.selectedBgColor = '#96641a';
          this.bgColorName = this.selectedBgColor;
          this.bgColorKills = this.bgColorOrigin = this.defaultBgColor;

          if (this.dataFromSearch) {
            this.displayEntry(null, this.dataFromSearch);
          };
        }
      );
  }

  sortMurdererByName = function () {
    this.murderersSorted = this.murderersByAlphabet;
    this.allMurderers = this.allMurderersByName;
    this.sortedBy = 'alphabet';
    this.bgColorName = this.selectedBgColor;
    this.bgColorKills = this.bgColorOrigin = this.defaultBgColor;
  };

  sortMurdererByKills = function () {
    this.bgColorKills = this.selectedBgColor;
    this.bgColorName = this.bgColorOrigin = this.defaultBgColor;
    if (this.byKillsHasBeenLoaded) {
      this.allMurderers = this.allMurderersByKills;
      this.murderersSorted = this.murderersByKills;
      this.sortedBy = 'kills';
    } else {
      this.murderersService.getAllMurderersByKills()
        .subscribe( (data: any) => {
          this.allMurderersByKills = [];
          for (let i = 0; i < this.kills.length; i++) {
            this.murderersByKills[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            this.allMurderersByKills.push(data[i].name);
            for (let j = 0; j < this.kills.length; j++) {
              if (data[i].kills == this.kills[j]) {
                this.murderersByKills[j].push(data[i].name);
              }
            }
          }
          this.byKillsHasBeenLoaded = true;
          this.allMurderers = this.allMurderersByKills;
          this.murderersSorted = this.murderersByKills;
          this.sortedBy = 'kills';
        });
    }
  };

  sortMurdererByOrigin = function () {
    this.bgColorOrigin = this.selectedBgColor;
    this.bgColorName = this.bgColorKills = this.defaultBgColor;
    if (this.byOriginHasBeenLoaded) {
      this.allMurderers = this.allMurderersByOrigin;
      this.murderersSorted = this.murderersByOrigin;
      this.sortedBy = 'origin';
    } else {
      this.murderersService.getAllMurderersByOrigin()
        .subscribe( (data: any) => {
          this.allMurderersByOrigin = [];
          this.origins = [];
          for (let i = 0; i < data.length; i++) {
            if (this.origins.length < 1) {
              this.origins.push(data[i].origin);
            } else {
              for (let j = 0; j < this.origins.length; j++) {
                if (this.origins[j] == data[i].origin) {
                  break;
                } else {
                  if (j == this.origins.length - 1) {
                    this.origins.push(data[i].origin);
                  }
                }
              }
            }
          }
          this.murderersByOrigin = new Array(this.origins.length);
          for (let i = 0; i < this.origins.length; i++) {
            this.murderersByOrigin[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            this.allMurderersByOrigin.push(data[i].name);
            for (let j = 0; j < this.origins.length; j++) {
              if (data[i].origin == this.origins[j]) {
                this.murderersByOrigin[j].push(data[i].name);
              }
            }
          }
          console.log(this.murderersByOrigin);
          this.byOriginHasBeenLoaded = true;
          this.allMurderers = this.allMurderersByOrigin;
          this.murderersSorted = this.murderersByOrigin;
          this.sortedBy = 'origin';
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

  callDeathEntry = function (event) {
    this.showDeathEntry.emit(event);
  };

  displayEntry = function (event, name) {
    if (this.allMurderers == undefined) {
      this.dataFromSearch = name;
    }
    else {
      let selectedName;
      if (name) {
        selectedName = name;
      } else {
        selectedName = event.target.textContent;
      }
      this.murderersService.getMurdererByName(selectedName).subscribe((data: any) => {
        this.murdererData = data;
        this.murderersService.getMurdererKills(selectedName).subscribe((killData: any) => {
          this.murdererData.kills = killData;
          this.deathsService.getAllDeathsByMurderer(selectedName).subscribe((victims: any) => {
            this.murdererData.victims = victims;
            this.murdererData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
            this.findNextAndPreviousEntry(this.allMurderers, selectedName);
          });
        });
      });
    }
  };

}
