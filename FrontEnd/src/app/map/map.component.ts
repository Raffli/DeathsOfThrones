import {Component, HostListener, OnInit} from '@angular/core';
import {DeathsService} from '../services/deaths.service';
import {EpisodesService} from '../services/episodes.service';
import {environment} from '../../environments/environment';

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

  private showEpisode : boolean;
  private showDeadPopup: boolean;
  private episodeData : any[];
  private deadData: any[];

  private locationCoordinates = [
    { place: "Astapor", x: 3991, y: 2954},
    { place: "Beyond the Wall", x: 1492, y: 202},
    { place: "Blackwater Bay", x: 1675, y: 2041},
    { place: "Braavos", x: 2200, y: 1400},
    { place: "Castle Black", x: 1227, y: 169},
    { place: "Cave of the Three-Eyed Raven", x: 1434, y: 264},
    { place: "Craster's Keep", x: 1365, y: 186},
    { place: "Hardhome", x: 1616, y: 74},
    { place: "Harrenhal", x: 1343, y: 1803},
    { place: "Haunted Forest", x: 1321, y: 69},
    { place: "King's Landing", x: 1557, y: 2057},
    { place: "Lhazar", x: 4426, y: 2456},
    { place: "Meereen", x: 4124, y: 2614},
    { place: "Pyke", x: 750, y: 1631},
    { place: "Qarth", x: 5298, y: 3206},
    { place: "Riverrun", x: 1100, y: 1751},
    { place: "The Dreadfort", x: 1534, y: 693},
    { place: "The Eyrie", x: 1600, y: 1600},
    { place: "The North", x: 1435, y: 748},
    { place: "The Red Waste", x: 4707, y: 2852},
    { place: "The Riverlands", x: 1137, y: 1660},
    { place: "The Stormlands", x: 1515, y: 2313},
    { place: "The Twins", x: 1152, y: 1462},
    { place: "Tower of Joy", x: 1159, y: 2613},
    { place: "Vaes Dothrak", x: 4750, y: 1796},
    { place: "Water Gardens", x: 1809, y: 2853},
    { place: "Winterfell", x: 1213, y: 770},
  ];

  public deaths = [];
  public imagesOfTheDead = [];
  private deadImagesOffsetX : number;
  private deadImagesOffsetY : number;

  constructor(private deathsService: DeathsService, private episodesService: EpisodesService) {}

  ngOnInit() {
    this.mouseIsDown = false;
    this.imageHeight = 3682;
    this.imageWidth = 5652;
    this.currentX = this.startX = 0;
    this.currentY = this.startY = 0;
    this.zoom = 1;
    this.scaling = 'scale(' + this.zoom + ')';
    this.imageSource = '/assets/map/gotMap100.jpg';
    this.calculateZoomOffset();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight  - 130;
    this.deadImagesOffsetY = this.deadImagesOffsetX = 0;
  }

  episodeSelected = function (event) {
    this.showDeadPopup = false;
    this.imagesOfTheDead = [];
    this.deathsService.getDeathsByEpisode(event).subscribe(
      (data: any) => {
        this.deaths = data;
        // check location duplicates
        let places = [];
        let differentPlaces = 0;
        for (let i=0; i<this.deaths.length; i++) {
          if (differentPlaces > 0) {
            let newPlace = false;
            let placeFound = false;
            for (let j=0; j<places.length; j++) {
              if (this.deaths[i].place == places[j].place) {
                places[j].count++;
                placeFound = true;
              }
              if (j == places.length-1 && !placeFound) {
                newPlace = true;
              }
            }
            if (newPlace) {
              places[differentPlaces] = [];
              places[differentPlaces] = {
                place: this.deaths[i].place, count: 1
              };
              differentPlaces++;
              newPlace = false;
            }
          } else {
            places[differentPlaces] = [];
            places[differentPlaces] = {
              place: this.deaths[i].place, count: 1
            };
            differentPlaces++;
          }
        }

        // show image of the dead
        for (let i=0; i<this.deaths.length; i++) {
          // find image by name
          let splitName = this.deaths[i].name.split(' ');
          let imageNameRequest = '';
          for (let j=0; j<splitName.length; j++) {
            imageNameRequest += splitName[j];
            if (j < splitName.length -1) {
              imageNameRequest += '%20';
            }
          }
          // set image coordinates
          let x, y, offsetX, offsetY : number;
          for (let j = 0; j < this.locationCoordinates.length; j++) {
            if (this.locationCoordinates[j].place == this.deaths[i].place) {
              for (let k = 0; k < places.length; k++) {
                if (this.deaths[i].place == places[k].place) {
                  if (places[k].count > 1) {
                    places[k].count--;
                    offsetX = places[k].count * 80;
                  } else {
                    offsetX = 0;
                  }
                }
              }
              x = this.locationCoordinates[j].x * this.zoom - 30;
              y = this.locationCoordinates[j].y * this.zoom - 37.5;
            }
          }
          this.imagesOfTheDead[i] = [];
          this.imagesOfTheDead[i].name = this.deaths[i].name;
          this.imagesOfTheDead[i].image = environment.baseUrl + 'image/imageByName?name=' + imageNameRequest;
          this.imagesOfTheDead[i].offsetX = offsetX;
          this.imagesOfTheDead[i].top = y - this.deadImagesOffsetY;
          this.imagesOfTheDead[i].left = x - this.deadImagesOffsetX + this.imagesOfTheDead[i].offsetX;
        }
      }
    );

    this.episodesService.getEpisodeById(event).subscribe( (data: any) => {
      this.episodeData = data;
      this.showEpisode = true;
    });
  };

  openDeadPopup = function (event) {
    this.deathsService.getDeathByName(event.target.name).subscribe((data: any) => {
      this.deadData = data;
      this.showDeadPopup = true;
    });
  };

  deadPopupClosed = function () {
    this.showDeadPopup = false;
  };

  popupClosed = function () {
    this.showEpisode = false;
  };

  updateDeadImagesXPosition = function (offset){
    this.deadImagesOffsetX += offset;
    for (let i=0; i<this.deaths.length; i++) {
      this.imagesOfTheDead[i].left -= offset;
    }
  };

  updateDeadImagesYPosition = function (offset){
    this.deadImagesOffsetY += offset;
    for (let i=0; i<this.deaths.length; i++) {
      this.imagesOfTheDead[i].top -= offset;
    }
  };

  updateDeadImagesZoom = function (){
    for (let i=0; i<this.deaths.length; i++) {
      let x, y : number;
      for (let j = 0; j < this.locationCoordinates.length; j++) {
        if (this.locationCoordinates[j].place == this.deaths[i].place) {
          x = this.locationCoordinates[j].x * this.zoom - 30;
          y = this.locationCoordinates[j].y * this.zoom - 37.5;
        }
      }
      this.imagesOfTheDead[i].top = y - this.deadImagesOffsetY;
      this.imagesOfTheDead[i].left = x - this.deadImagesOffsetX + this.imagesOfTheDead[i].offsetX;
    }
  };

  onMouseMove = function (event) {
    if (this.mouseIsDown) {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight  - 130;
      this.currentX += event.clientX - this.startX;
      if (this.currentX < 0 && this.currentX > -1 * (this.imageWidth * this.zoom - this.screenWidth)) {
        this.positionX = this.offsetX + this.currentX;
        this.updateDeadImagesXPosition(this.startX - event.clientX);
      } else {
        if (this.currentX >= 0) {
          this.currentX = 0;
        } else {
          this.currentX = -1 * (this.imageWidth * this.zoom - this.screenWidth);
        }
      }
      this.startX = event.clientX;
      this.currentY += event.clientY - this.startY;
      if (this.currentY < 0 && this.currentY > -1 * (this.imageHeight * this.zoom - this.screenHeight)) {
        this.positionY = this.offsetY + this.currentY;
        this.updateDeadImagesYPosition(this.startY - event.clientY);
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
    let actualImageWidth = this.imageWidth * this.zoom;
    let actualImageHeight = this.imageHeight * this.zoom;
    this.offsetX = -(this.imageWidth - actualImageWidth) * 0.5;
    this.offsetY = -(this.imageHeight - actualImageHeight) * 0.5;
    let scrollWidth = this.screenWidth - actualImageWidth;
    let scrollHeight = this.screenHeight - actualImageHeight;
    if (this.currentX < scrollWidth) {
      this.currentX += this.imageWidth * 0.05;
      this.deadImagesOffsetX -= this.imageWidth * 0.05;
    }
    if (this.currentY < scrollHeight) {
      this.currentY += this.imageHeight * 0.05;
      this.deadImagesOffsetY -= this.imageHeight * 0.05;
    }
    this.positionX = this.offsetX + this.currentX;
    this.positionY = this.offsetY + this.currentY;
    this.updateDeadImagesZoom();
  };

  @HostListener('window:keydown', ['$event'])
  myKeyEvent = function (event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 100;
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

  mouseWheelFunc = function (event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight  - 130;
    if (event.deltaY < 0) {
      if (this.zoom < 1.50) {
        this.zoom += 0.05;
        this.calculateZoomOffset();
      }
    } else if (event.deltaY > 0) {
      if (this.zoom > 0.35) {
        this.zoom -= 0.05;
        this.calculateZoomOffset();
      }
    }
  };

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

}
