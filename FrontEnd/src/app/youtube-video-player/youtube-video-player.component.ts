import {Component, Input, OnInit} from '@angular/core';

import PlayerOptions = YT.PlayerOptions;
@Component({
  selector: 'app-youtube-video-player',
  templateUrl: './youtube-video-player.component.html',
  styleUrls: ['./youtube-video-player.component.css']
})
export class YoutubeVideoPlayerComponent implements OnInit {


  @Input() public videoId: string;
  @Input() public startSeconds: number;
  @Input() public endSeconds: number;
  @Input() public height: number;
  @Input() public width: number;

  onStateChangeBinded = this.onStateChange.bind(this);

  player: YT.Player;
  playerConfig: PlayerOptions;

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

    this.initPlayer();

  }

  initPlayer() {
    this.player = new YT.Player('myvideo', this.playerConfig);
  }



  onStateChange(state) {
    if (state.data === YT.PlayerState.ENDED) {
      this.player.seekTo(this.startSeconds, true)
    }
  }



}
