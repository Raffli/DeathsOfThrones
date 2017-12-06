import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-episode-popup',
  templateUrl: './episode-popup.component.html',
  styleUrls: ['./episode-popup.component.css']
})
export class EpisodePopupComponent implements OnInit {

  @Input () public data: any[];

  @Output()
  public popupClosed = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  hidePopup = function (){
    console.log("button clicked");
    this.popupClosed.emit();
  }

}
