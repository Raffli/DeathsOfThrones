import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../services/data-service.service';

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
  private imageSource: string;
  private zoom: number;
  private screenWidth: number;
  private screenHeight: number;
  private imageWidth: number;
  private imageHeight: number;

  public deaths = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.mouseIsDown = false;
    this.currentX = 0;
    this.currentY = 0;
    this.zoom = 100;
    this.imageSource = '/assets/map/gotMap' + this.zoom + '.jpg';
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 25;
    this.imageHeight = 3682;
    this.imageWidth = 5652;

    this.dataService.getDeathsByEpisode(60).subscribe(
      (data: any) => {
        this.deaths = data;
      }
    )
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
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 25;
    if (event.keyCode === 87 || event.keyCode === 38) { // w
      if (this.currentY < 0)
        this.currentY += 50;
    } else if (event.keyCode === 65 || event.keyCode === 37) { // a
      if (this.currentX < 0)
        this.currentX += 50;
    } else if (event.keyCode === 83 || event.keyCode === 40) { // s
      let movableHeight = this.imageHeight * this.zoom / 100 - this.screenHeight;
      if ( (movableHeight + this.currentY) > 0 )
        this.currentY -= 50;
    } else if (event.keyCode === 68 || event.keyCode === 39) { // d
      let movableWidth = this.imageWidth * this.zoom / 100 - this.screenWidth;
      console.log(movableWidth + " " + this.currentX);
      if ( (movableWidth + this.currentX) > 50 )
        this.currentX -= 50;
    } else if (event.keyCode === 109) {
      if (this.zoom > 35) {
        this.zoom -= 5;
      } else {
        return;
      }
      this.imageSource = '/assets/map/gotMap' + this.zoom + '.jpg';
    } else if (event.keyCode === 107) {
      if (this.zoom < 150) {
        this.zoom += 5;
      } else {
        return;
      }
      this.imageSource = '/assets/map/gotMap' + this.zoom + '.jpg';
    } else {
      return;
    }
    this.positionX = this.currentX + 'px';
    this.positionY = this.currentY + 'px';
  };

}
