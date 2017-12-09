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

  @Input () public currentEntity : string;
  @Input () public hasNextEntry : boolean;
  @Input () public hasPreviousEntry : boolean;
  @Input () public nextEntry : string;
  @Input () public previousEntry : string;

  @Output()
  public returnToList = new EventEmitter<number>();
  @Output()
  public showPreviousEntry = new EventEmitter<String>();
  @Output()
  public showNextEntry = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  callReturnToList = function () {
    this.returnToList.emit();
  };

  callPreviousEntry = function () {
    this.showPreviousEntry.emit();
  };

  callNextEntry = function () {
    this.showNextEntry.emit();
  };

}
