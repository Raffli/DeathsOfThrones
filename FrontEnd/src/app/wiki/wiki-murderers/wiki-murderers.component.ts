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
  private murderersByAlphabet = new Array(this.alphabet.length);
  private allMurderers: any[];
  private murderersLoaded: boolean;
  private showEntry: boolean;
  private nextEntry : string;
  private hasNextEntry : boolean;
  private previousEntry : string;
  private hasPreviousEntry : boolean;

  @Output()
  public showDeathEntry = new EventEmitter<String>();

  constructor(private deathsService: DeathsService, private murderersService: MurderersService) { }

  ngOnInit() {
    this.murderersService.getAllMurderersOnlyName()
      .subscribe(
        (data: any) => {
          this.allMurderers = data;
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
        }
      );
  }

  sortMurdererByName = function () {

  };

  sortMurdererByKills = function () {

  };

  sortMurdererByOrigin = function () {

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
    let selectedName;
    if (name) {
      selectedName = name;
    } else {
      selectedName = event.target.textContent;
    }
    this.murderersService.getMurdererByName(selectedName).subscribe( (data: any) => {
      this.murdererData = data;
      this.murderersService.getMurdererKills(selectedName).subscribe((killData: any) => {
        this.murdererData.kills = killData;
        this.deathsService.getAllDeathsByMurderer(selectedName).subscribe( (victims: any) => {
          this.murdererData.victims = victims;
          this.murdererData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
          this.findNextAndPreviousEntry(this.allMurderers, selectedName);
        });
      });
    });
  };

}
