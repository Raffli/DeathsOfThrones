import { Component, OnInit } from '@angular/core';
import {DeathsService} from '../services/deaths.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  private hasName: boolean;
  private data: any;
  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
  "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private deathsByAlphabet = new Array(this.alphabet.length);
  private murderersByAlphabet = new Array(this.alphabet.length);
  private locationsByAlphabet = new Array(this.alphabet.length);
  private episodesByAlphabet = new Array(this.alphabet.length);
  private dataLoaded : boolean;

  constructor(private deathsService: DeathsService) { }

  ngOnInit() {
    this.deathsService.getAllDeathsOnlyName()
      .subscribe(
        (data: any) => {
          this.hasName = true;
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


          this.dataLoaded = true;
        }
      )
  }

}
