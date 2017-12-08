import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-display-entry',
  templateUrl: './display-entry.component.html',
  styleUrls: ['./display-entry.component.css']
})
export class DisplayEntryComponent implements OnInit {

  @Input () public deadData: any[];
  @Input () public murdererData: any[];
  @Input () public locationData: any[];
  @Input () public episodeData: any[];

  @Input () public showDead: boolean;
  @Input () public showMurderer: boolean;
  @Input () public showLocation: boolean;
  @Input () public showEpisode: boolean;

  @Output()
  public returnToList = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  callReturnToList = function () {
    this.returnToList.emit();
  }

}
