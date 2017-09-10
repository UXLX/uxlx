import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {
  youtube: any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '360',
    playerWidth: '640'
  };
  ytVideoID: string;

  constructor() {
    this.setupPlayer();
  }

  bindPlayer(elementId): void {
    this.youtube.playerId = elementId;
  };

  createPlayer(): void {
    return new window['YT'].Player(this.youtube.playerId, {
      height: this.youtube.playerHeight,
      width: this.youtube.playerWidth,
      playerVars: {
        rel: 0,
        showinfo: 0
      }
    });
  }

  loadPlayer(): void {
    if (this.youtube.ready && this.youtube.playerId) {
      if (this.youtube.player) {
        this.youtube.player.destroy();
      }
      this.youtube.player = this.createPlayer();
    }
  }

  setupPlayer() {
    //we need to check if the api is loaded
    window['onYouTubeIframeAPIReady'] = () => {
      if (window['YT']) {
        this.youtube.ready = true;
        this.bindPlayer('placeholder');
        this.loadPlayer();
      }
    };
    if (window['YT'] && window['YT'].Player) {
      this.youtube.ready = true;
      this.bindPlayer('placeholder');
      this.loadPlayer();
      console.log(this.youtube.player);
      //this.ytVideoID = 'http://www.youtube.com/watch?v=' + this.youtube.player.b.c.videoId;
    }
  }

  launchPlayer(id): void {
    this.youtube.player.loadVideoById(id);
    this.youtube.videoId = id;
    console.log(this.youtube.videoId);
    return this.youtube;
  }

  /* playerStateChange(event): void {
    switch (event.data) {
      case (window['YT'].PlayerState.PLAYING):
          break;
      case (window['YT'].PlayerState.PAUSED):
          if (lastPlayer2State == window['YT'].PlayerState.PLAYING) {
              videoWatched(lastPlayer2Time, youTubeEmbeddedplayer.getCurrentTime(), ytEmbeddedVideoTitle, ytEmbeddedVideoID)
          } else if (lastPlayerState == YT.PlayerState.PAUSED) {
              videoWatched(lastPlayer2Time, youTubeEmbeddedplayer.getCurrentTime(), ytEmbeddedVideoTitle, ytEmbeddedVideoID);
          }
          break;
      case (YT.PlayerState.ENDED):
          //videoEnded();
          break;
      case (YT.PlayerState.UNSTARTED):
          break;
    }

    lastPlayer2Time = youTubeEmbeddedplayer.getCurrentTime();
    lastPlayer2State = event.data;
  } */
}
