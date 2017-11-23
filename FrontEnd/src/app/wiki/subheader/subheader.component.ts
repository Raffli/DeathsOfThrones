import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {

  public items: any[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'THE DEATHS', routerLink: '/map'},
      {label: 'THE KILLERS', routerLink: '/wiki'},
      {label: 'THE PLACES', routerLink: '/stats'},
      {label: 'THE EPISODES', routerLink: '/contact'},
    ];
  }

}
