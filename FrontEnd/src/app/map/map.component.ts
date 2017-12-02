import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../services/data-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mouseIsDown : boolean;
  private startX : number;
  private startY : number;
  private currentX : number;
  private currentY : number;
  private positionX : number;
  private positionY : number;
  private offsetX : number;
  private offsetY : number;
  private imageSource: string;
  private zoom: number;
  private scaling : string;
  private screenWidth: number;
  private screenHeight: number;
  private imageWidth: number;
  private imageHeight: number;

  public deaths = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.mouseIsDown = false;
    this.imageHeight = 3682;
    this.imageWidth = 5652;
    this.currentX = this.startX = 0;
    this.currentY = this.startY = 0;
    this.zoom = 0.9;
    this.scaling = 'scale(' + this.zoom + ')';
    this.imageSource = '/assets/map/gotMap100.jpg';
    this.calculateZoomOffset();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 25;


    this.dataService.getDeathsByEpisode(60).subscribe(
      (data: any) => {
        this.deaths = data;
      }
    )
  }

  onMouseMove = function (event) {
    if (this.mouseIsDown) {
      this.currentX += event.clientX - this.startX;
      if (this.currentX < 0 && this.currentX > -1 * (this.imageWidth * this.zoom - this.screenWidth)) {
        this.positionX = this.offsetX + this.currentX;
      } else {
        if (this.currentX >= 0) {
          this.currentX = 0;
        } else {
          this.currentX = -1 * (this.imageWidth * this.zoom - this.screenWidth);
        }
      }
      this.startX = event.clientX;
      this.currentY += event.clientY - this.startY;
      this.startY = event.clientY;
      if (this.currentY < 0 && this.currentY > -1 * (this.imageHeight * this.zoom - this.screenHeight)) {
        this.positionY = this.offsetY + this.currentY;
      } else {
        if (this.currentY >= 0) {
          this.currentY = 0;
        } else {
          this.currentY = -1 * (this.imageHeight * this.zoom - this.screenHeight);
        }
      }
      this.startY = event.clientY;
    }
  };

  onMouseUp = function (event) {
    this.mouseIsDown = false;
  };

  onMouseDown = function (event) {
    this.mouseIsDown = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  };

  calculateZoomOffset = function () {
    this.scaling = 'scale(' + this.zoom + ')';
    this.offsetX = -(this.imageWidth - this.imageWidth * this.zoom) * 0.5;
    this.offsetY = -(this.imageHeight - this.imageHeight * this.zoom) * 0.5;
    this.positionX = this.offsetX + this.currentX;
    this.positionY = this.offsetY + this.currentY;
  };

  @HostListener('window:keydown', ['$event'])
  myKeyEvent = function (event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 25;
    if (event.keyCode === 109) {
      if (this.zoom > 0.35) {
        this.zoom -= 0.05;
        this.calculateZoomOffset();
      } else {
        return;
      }
    } else if (event.keyCode === 107) {
      if (this.zoom < 1.50) {
        this.zoom += 0.05;
        this.calculateZoomOffset();
      } else {
        return;
      }
    } else {
      return;
    }
  };

}
