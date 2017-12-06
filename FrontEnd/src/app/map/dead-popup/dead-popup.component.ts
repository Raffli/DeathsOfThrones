import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dead-popup',
  templateUrl: './dead-popup.component.html',
  styleUrls: ['./dead-popup.component.css']
})
export class DeadPopupComponent implements OnInit {

  @Input () public data: any[];

  @Output()
  public popupClosed = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  hidePopup = function (){
    this.popupClosed.emit();
  }

}
