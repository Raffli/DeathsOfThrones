import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-youtube-video-player',
  templateUrl: './youtube-video-player.component.html',
  styleUrls: ['./youtube-video-player.component.css']
})
export class YoutubeVideoPlayerComponent implements OnInit, OnChanges {



  @Input() public videoId: string;
  @Input() public startSeconds: number;
  @Input() public endSeconds: number;
  @Input() public height: number;
  @Input() public width: number;

  onStateChangeBinded = this.onStateChange.bind(this);

  player: any;
  playerConfig: any;

  constructor() { }

  ngOnInit() {

    this.playerConfig =  {
      height: this.height,
      width: this.width,
      videoId: this.videoId,
      playerVars: {
        autoplay: 1,            // Auto-play the video on load
        controls: 0,            // Show pause/play buttons in player
        showinfo: 0,            // Hide the video title
        modestbranding: 1,      // Hide the Youtube Logo
        fs: 1,                  // Hide the full screen button
        cc_load_policy: 0,      // Hide closed captions
        iv_load_policy: 3,      // Hide the Video Annotations
        start: this.startSeconds,
        end: this.endSeconds,
        autohide: 0, // Hide video controls when playing
      },
      events: {
        'onStateChange': this.onStateChangeBinded,       // reference to Iframe API
        onReady: function(e) {              // mute the video when loaded
          e.target.mute();
        }
      }
    };
    this.setupPlayer();

  }



  ngOnChanges(changes: SimpleChanges): void {
    if(!this.playerConfig) {
      return;
    }

    if ('startSeconds' in changes) {
      this.playerConfig.startSeconds = this.startSeconds;
      console.debug(this.startSeconds)
    }
    if ('endSeconds' in changes) {
      this.playerConfig.endSeconds = this.endSeconds;
      console.debug(this.endSeconds)
    }
    this.setupPlayer();

  }

  setupPlayer() {

    if(this.player) {
      this.player.loadVideoById({
        videoId: this.videoId,
        startSeconds: this.startSeconds,
        endSeconds: this.endSeconds
      });
    } else {
      if(YT.Player){

        this.player = new YT.Player('myvideo', this.playerConfig);
      } else {
        setTimeout(() =>this.setupPlayer());
      }
    }






  }



  onStateChange(state) {
    if (state.data === YT.PlayerState.ENDED) {
      console.debug('end')
      this.player.loadVideoById({
        videoId: this.videoId,
        startSeconds: this.startSeconds,
        endSeconds: this.endSeconds
      });
    }
  }
}

declare var YT: any;
