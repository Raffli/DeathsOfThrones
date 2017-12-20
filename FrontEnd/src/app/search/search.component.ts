import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private showResults: boolean;
  private mouseOnComponent: boolean;
  private searchResults: any[];
  private searchInput: any;

  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    this.searchInput = document.getElementById('searchInput');
  }

  goToEntry = function (value, category) {
    this.router.navigate(['/wiki'], {queryParams: {name: value, category: category}});
    this.showResults = false;
    this.mouseOnComponent = false;
    this.searchResults = null;
    this.searchInput.value = '';
  };

  onInput = function (event) {
    if (event.target.value.length > 2) {
      this.searchService.searchDatabase(event.target.value)
        .subscribe( (result: any) => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].category == 'death') {
              result[i].category = 'Death';
            } else if (result[i].category == 'murder') {
              result[i].category = 'Murderer';
            } else if (result[i].category == 'place') {
              result[i].category = 'Location';
            } if (result[i].category == 'episode') {
              result[i].category = 'Episode';
            }
          }
          if (result.length > 10) {
            this.searchResults = [];
            for (let i = 0; i < 10; i++) {
              this.searchResults[i] = result[i];
            }
          } else {
            this.searchResults = result;
          }
        });
    } else {
      this.searchResults = null;
    }

  };

  onMouseOver = function (event) {
    this.mouseOnComponent = true;
  };

  onMouseLeave = function (event) {
    this.mouseOnComponent = false;
  };

  onInputFocus = function (event) {
    this.searchResults = null;
    this.showResults = true;
  };

  onInputBlur = function (event) {
    if (!this.mouseOnComponent) {
      this.showResults = false;
      this.searchResults = null;
    }
  };


}
