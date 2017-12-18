import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit = function (event) {
    this.router.navigate(['/wiki'], {queryParams: {name: event.target.value, category: 'Episode'}});
      event.target.value = '';
  };

  onInput = function (event) {


  };


}
