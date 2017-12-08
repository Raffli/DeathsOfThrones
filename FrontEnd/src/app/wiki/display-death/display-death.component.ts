import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-death',
  templateUrl: './display-death.component.html',
  styleUrls: ['./display-death.component.css']
})
export class DisplayDeathComponent implements OnInit {

  @Input () public data: any[];

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
