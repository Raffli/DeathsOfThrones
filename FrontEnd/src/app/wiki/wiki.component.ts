import { Component, OnInit } from '@angular/core';
import {DeathsService} from '../services/deaths.service';
import {MurderersService} from "../services/murderers.service";
import {LocationsService} from "../services/locations.service";
import {EpisodesService} from "../services/episodes.service";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
  "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private deathsByAlphabet = new Array(this.alphabet.length);
  private allDeaths: any [];
  private murderersByAlphabet = new Array(this.alphabet.length);
  private allMurderers: any[];
  private locationsByAlphabet = new Array(this.alphabet.length);
  private allLocations: any[];
  private episodesByAlphabet = new Array(this.alphabet.length);
  private allEpisodes: any[];
  private deathsLoaded : boolean;
  private murderersLoaded: boolean;
  private locationsLoaded: boolean;
  private episodesLoaded: boolean;
  private showEntry: boolean;
  private deadData: any[];
  private murdererData: any[];
  private locationData: any[];
  private episodeData: any[];
  private selectedIndex: number = 0;
  private selectedEntity : string;
  private nextEntry : string;
  private hasNextEntry : boolean;
  private previousEntry : string;
  private hasPreviousEntry : boolean;

  constructor(private deathsService: DeathsService, private murderersService: MurderersService,
              private locationsService: LocationsService, private episodesService: EpisodesService) { }

  ngOnInit() {
    this.showEntry = false;
    this.deathsService.getAllDeathsOnlyName()
      .subscribe(
        (data: any) => {
          this.allDeaths = data;
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
          this.deathsLoaded = true;
        }
      );

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

    this.locationsService.getAllLocationOnlyName()
      .subscribe(
        (data: any) => {
          this.allLocations = data;
          for (let i = 0; i < this.alphabet.length; i++) {
            this.locationsByAlphabet[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.alphabet.length; j++) {
              let firstLetter = data[i].charAt(0);
              firstLetter = firstLetter.toUpperCase();
              if (firstLetter == this.alphabet[j]) {
                this.locationsByAlphabet[j].push(data[i]);
              }
            }
          }
          this.locationsLoaded = true;
        }
      );

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

  onChange($event) {
    if (this.showEntry) {
      this.showEntry = false;
    }
    this.selectedIndex = $event.index;
  }

  handleReturnFromEntry = function () {
    this.showEntry = false;
  };

  showMurdererEntry = function (event) {
    this.selectedIndex = 1;
    this.displayEntry(null, event);
  };

  showLocationEntry = function (event) {
    this.selectedIndex = 2;
    this.displayEntry(null, event);
  };

  showEpisodeEntry = function (event) {
    this.selectedIndex = 3;
    this.displayEntry(null, this.allEpisodes[event]);
  };

  showDeathEntry = function (event) {
    this.selectedIndex = 0;
    this.displayEntry(null, event);
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
      this.previousEntry = null;
    }
    if (entries[entryIndex + 1]) {
      this.hasNextEntry = true;
      this.nextEntry = entries[entryIndex+1];
    } else {
      this.hasNextEntry = false;
    }
    this.showEntry = true;
  };

  showPreviousEntry = function () {
    this.displayEntry(null, this.previousEntry);
  };

  showNextEntry = function () {
    this.displayEntry(null, this.nextEntry);
  };

  displayEntry = function (event, name) {
    let selectedName;
    if (name) {
      selectedName = name;
    } else {
      selectedName = event.target.textContent;
    }
    if (this.selectedIndex == 0) {
      this.selectedEntity = "Deaths";
      this.deathsService.getDeathByName(selectedName).subscribe( (data: any) => {
        this.deadData = data;
        this.deadData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
        this.findNextAndPreviousEntry(this.allDeaths, selectedName);
      });
    } else if (this.selectedIndex == 1) {
      this.selectedEntity = "Murderers";
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
    } else if (this.selectedIndex == 2) {
      this.selectedEntity = "Locations";
      this.locationsService.getLocationByName(selectedName).subscribe( (data: any) => {
        this.locationData = data;
        this.locationData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
        this.findNextAndPreviousEntry(this.allLocations, selectedName);
      });
    } else if (this.selectedIndex == 3) {
      this.selectedEntity = "Episodes";
      this.episodesService.getEpisodeByTitle(selectedName).subscribe( (data: any) => {
        this.episodeData = data;
        this.episodeData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
        this.findNextAndPreviousEntry(this.allEpisodes, selectedName);
      });
    }

  };
}
