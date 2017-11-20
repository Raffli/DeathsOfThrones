import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'MAP', icon: 'fa-globe', routerLink: '/map'},
      {label: 'WIKI', icon: 'fa-info-circle', routerLink: '/wiki'},
      {label: 'STATS', icon: 'fa-bar-chart', routerLink: '/stats'},
      {label: 'SEARCH', icon: 'fa-search'},
      {label: 'CONTACT', icon: 'fa-envelope', routerLink: '/contact'},
    ];
  }

}
