import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EpisodesService} from '../../services/episodes.service';

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

  constructor(private episodesService: EpisodesService) { }

  ngOnInit() {
    this.episodesService.getAllEpisodes().subscribe(
        (data: any) => {
          this.episodes = data;
        }
      )
  }

  selectEpisode (episode) {
    this.currentid = episode;
    this.episodeSelected.emit(this.currentid);
  }

}
