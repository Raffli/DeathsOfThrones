import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../services/data-service.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public episodes = [];
  public currentid : number;

  @Output()
  public episodeSelected = new EventEmitter<number>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.currentid = 6;
    this.dataService.getAllEpisodes().subscribe(
      (data: any) => {
        this.episodes = data;
      }
    );
  }

  selectEpisode (episode) {
    this.currentid = episode;
    console.log(this.currentid);
    this.episodeSelected.emit(this.currentid);
  }

}
