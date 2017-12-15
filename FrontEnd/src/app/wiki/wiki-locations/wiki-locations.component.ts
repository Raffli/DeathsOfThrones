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
  private locationsByAlphabet = new Array(this.alphabet.length);
  private allLocations: any[];
  private locationsLoaded: boolean;
  private showEntry: boolean;

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
          this.locationsLoaded = true;
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

  displayEntry = function (event, name) {
    let selectedName;
    if (name) {
      selectedName = name;
    } else {
      selectedName = event.target.textContent;
    }
    this.selectedEntity = "Locations";
    this.locationsService.getLocationByName(selectedName).subscribe( (data: any) => {
      this.locationData = data;
      this.locationData.image = environment.baseUrl + 'image/imageByName?name=' + selectedName;
      this.findNextAndPreviousEntry(this.allLocations, selectedName);
    });
  };
}
