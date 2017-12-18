import { Component, OnInit } from '@angular/core';
import {LocationsService} from '../../services/locations.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-wiki-locations',
  templateUrl: './wiki-locations.component.html',
  styleUrls: ['./wiki-locations.component.css']
})
export class WikiLocationsComponent implements OnInit {

  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private regions;
  private populations = [100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000];
  private locationsSorted;
  private locationsByAlphabet = new Array(this.alphabet.length);
  private locationsByRegion = [];
  private locationsByPopulation = new Array(this.populations.length);
  private allLocations: any[];
  private allLocationsByName: any[];
  private allLocationsByRegion: any[];
  private allLocationsByPopulation: any[];
  private byRegionHasBeenLoaded: boolean;
  private byPopulationHasBeenLoaded: boolean;
  private locationsLoaded: boolean;
  private showEntry: boolean;
  private sortedBy: string;
  private defaultBgColor: string;
  private selectedBgColor: string;
  private bgColorName : string;
  private bgColorRegion : string;
  private bgColorPopulation: string;
  private locationData: any[];

  constructor(private locationsService: LocationsService) { }

  ngOnInit() {
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
          this.locationsSorted = this.locationsByAlphabet;
          this.sortedBy = 'alphabet';
          this.locationsLoaded = true;

          this.defaultBgColor = '#969070';
          this.selectedBgColor = '#96641a';
          this.bgColorName = this.selectedBgColor;
          this.bgColorRegion = this.bgColorPopulation = this.defaultBgColor;
        }
      );
  }

  sortByName = function () {
    this.locationsSorted = this.locationsByAlphabet;
    this.allLocations = this.allLocationsByName;
    this.sortedBy = 'alphabet';
    this.bgColorName = this.selectedBgColor;
    this.bgColorRegion = this.bgColorPopulation = this.defaultBgColor;
  };

  sortByRegion = function () {
    this.bgColorRegion = this.selectedBgColor;
    this.bgColorName = this.bgColorPopulation = this.defaultBgColor;
    if (this.byRegionHasBeenLoaded) {
      this.locationsSorted = this.locationsByRegion;
      this.allLocations = this.allLocationsByRegion;
      this.sortedBy = 'region';
    } else {
      this.locationsService.getAllRegionsOnlyName()
        .subscribe( (regionData: any) => {
          this.regions = regionData;
          this.locationsService.getAllLocationsByRegion()
            .subscribe( (data: any) => {
              this.allLocationsByRegion = [];
              for (let i = 0; i < this.regions.length; i++) {
                this.locationsByRegion[i] = [];
              }
              for (let i = 0; i < data.length; i++) {
                this.allLocationsByRegion.push(data[i].name);
                for (let j = 0; j < this.regions.length; j++) {
                  if (data[i].region == this.regions[j]) {
                    this.locationsByRegion[j].push(data[i].name);
                  }
                }
              }
              this.byRegionHasBeenLoaded = true;
              this.locationsSorted = this.locationsByRegion;
              this.allLocations = this.allLocationsByRegion;
              this.sortedBy = 'region';
            });
        });
    }
  };

  sortByPopulation = function () {
    this.bgColorPopulation = this.selectedBgColor;
    this.bgColorRegion = this.bgColorName = this.defaultBgColor;
    if (this.byPopulationHasBeenLoaded) {
      this.locationsSorted = this.locationsByPopulation;
      this.allLocations = this.allLocationsByPopulation;
      this.sortedBy = 'population';
    } else {
      this.locationsService.getALlLocationsByPopulation()
        .subscribe( (data: any) => {
          this.allLocationsByPopulation = [];
          for (let i = 0; i < this.populations.length; i++) {
            this.locationsByPopulation[i] = [];
          }
          for (let i = 0; i < data.length; i++) {
            this.allLocationsByPopulation.push(data[i].name);
            for (let j = 0; j < this.populations.length; j++) {
              if (data[i].population < this.populations[j]) {
                this.locationsByPopulation[j].push(data[i].name);
                break;
              }
            }
          }
          this.byPopulationHasBeenLoaded = true;
          this.locationsSorted = this.locationsByPopulation;
          this.allLocations = this.allLocationsByPopulation;
          this.sortedBy = 'population';
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

  displayEntry = function (event, name) {
    let selectedName;
    if (name) {
      selectedName = name;
    } else {
      selectedName = event.target.textContent;
    }
    this.locationsService.getLocationByName(selectedName).subscribe( (data: any) => {
      this.locationData = data;
      this.locationData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
      this.findNextAndPreviousEntry(this.allLocations, selectedName);
    });
  };
}
