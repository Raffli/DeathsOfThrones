import { Component, OnInit } from '@angular/core';
import {DeathsService} from '../services/deaths.service';
import {MurderersService} from "../services/murderers.service";
import {LocationsService} from "../services/locations.service";
import {EpisodesService} from "../services/episodes.service";

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  private data: any;
  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
  "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private deathsByAlphabet = new Array(this.alphabet.length);
  private murderersByAlphabet = new Array(this.alphabet.length);
  private locationsByAlphabet = new Array(this.alphabet.length);
  private episodesByAlphabet = new Array(this.alphabet.length);
  private deathsLoaded : boolean;
  private murderersLoaded: boolean;
  private locationsLoaded: boolean;
  private episodesLoaded: boolean;
  private showEntry: boolean;
  private deadData: any[];

  constructor(private deathsService: DeathsService, private murderersService: MurderersService,
              private locationsService: LocationsService, private episodesService: EpisodesService) { }

  ngOnInit() {
    this.showEntry = false;
    this.deathsService.getAllDeathsOnlyName()
      .subscribe(
        (data: any) => {
          this.data = data;
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

  displayEntry = function (event) {
    this.deathsService.getDeathByName(event.target.textContent).subscribe( (data: any) => {
      this.deadData = data;
      // find image by name
      let splitName = event.target.textContent.split(" ");
      let imageNameRequest = "";
      for (let j=0; j<splitName.length; j++) {
        imageNameRequest += splitName[j];
        if (j < splitName.length -1) {
          imageNameRequest += "%20";
        }
      }
      this.deadData.image = "http://localhost:8080/dot/image/imageByName?name=" + imageNameRequest;
      this.showEntry = true;
    });
  };
}
