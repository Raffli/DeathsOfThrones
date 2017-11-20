import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mouseIsDown : boolean;
  private currentX : number;
  private currentY : number;
  private positionX : string;
  private positionY : string;
  private boundary: any;

  constructor() { }

  ngOnInit() {
    this.mouseIsDown = false;
    this.currentX = 0;
    this.currentY = 0;
  }

  onMouseMove = function (event) {
    if (this.mouseIsDown) {
      //console.log(event.clientX);
    }
  };

  onMouseUp = function (event) {
    this.mouseIsDown = false;
    //console.log(this.mouseIsDown);
  };

  onMouseDown = function (event) {
    this.mouseIsDown = true;
    //console.log(this.mouseIsDown);
  };

  myKeyEvent = function (event) {
    if (event.keyCode === 87 || event.keyCode === 38) { // w
      this.currentY += 50;
    } else if (event.keyCode === 65 || event.keyCode === 37) { // a
      this.currentX += 50;
    } else if (event.keyCode === 83 || event.keyCode === 40) { // s
      this.currentY -= 50;
    } else if (event.keyCode === 68 || event.keyCode === 39) { // d
      this.currentX -= 50;
    } else {
      return;
    }
    this.positionX = this.currentX + 'px';
    this.positionY = this.currentY + 'px';
  };

}
