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
  }

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
    }
  }

  launchPlayer(id): void {
    this.youtube.player.loadVideoById(id);
    this.youtube.videoId = id;
    return this.youtube;
  }
}
