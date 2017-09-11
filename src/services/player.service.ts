import { Injectable } from '@angular/core';
import TinCan from 'tincanjs';
import { LRSService } from './lrs.service';

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
  youTubeEmbeddedplayer: any;
  videoTinCan: any;
  ytEmbeddedVideoID: string;
  ytEmbeddedVideoTitle: string;
  lastPlayer2Time: string;
  lastPlayer2State: string;
  userEmail: string;
  userName: string;

constructor(public lrs: LRSService) {
  var tag = document.createElement('script');
   tag.src = "https://www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
   //this.setupPlayer();
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
    },
    videoId: this.youtube.videoId,
    events: {
          'onStateChange': this.onPlayerStateChange.bind(this)
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
      this.bindPlayer('youTubeIframe');
      this.loadPlayer();
    }
  };
  if (window['YT'] && window['YT'].Player) {
    this.youtube.ready = true;
    this.bindPlayer('youTubeIframe');
    this.loadPlayer();
  }
}

launchPlayer(id, userEmail, userName): void {
    this.youtube.videoId = id;
    this.userEmail = userEmail;
    this.userName = userName;
    this.setupPlayer();
  }

  onPlayerStateChange(event): void {
    var self = this;
    self.ytEmbeddedVideoID = 'http://www.youtube.com/watch?v=' + self.youtube.player.getVideoData()['video_id'];
    self.ytEmbeddedVideoTitle = self.youtube.player.getVideoData().title;
    switch (event.data) {
      case (window['YT'].PlayerState.PLAYING):
        break;
      case (window['YT'].PlayerState.PAUSED):
        if (self.lastPlayer2State == window['YT'].PlayerState.PLAYING) {
          self.videoWatched(this.lastPlayer2Time, self.youtube.player.getCurrentTime(), self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.userEmail, self.userName)
        }
        break;
      case (window['YT'].PlayerState.ENDED):
        //videoEnded();
        break;
      case (window['YT'].PlayerState.UNSTARTED):
        break;
   }

   self.lastPlayer2Time = self.youtube.player.getCurrentTime();
   self.lastPlayer2State = event.data;
 }

  videoWatched(start, finish, videoTitle, videoID, userEmail, userName) {//start and finish in seconds
    var self = this;
    self.videoTinCan = new TinCan.Statement({
        actor: {
            name: userName,
            mbox: userEmail,
        },
        verb: {
            id: "http://activitystrea.ms/schema/1.0/watch",
            display: {'en-US': 'watched'}
        },
        target: {
            id: videoID,
            definition: {
                name: { "en-US": videoTitle + " from " + self.timeString(start) + " to " + self.timeString(finish) },
                extensions: {
                    "http://id.tincanapi.com/extension/starting-point": self.timeString(start),
                    "http://id.tincanapi.com/extension/ending-point": self.timeString(finish)
                }
            }
        }
    });
    console.log(self.videoTinCan);

    /*self.lrs.lrs.saveStatement(
      self.videoTinCan,
      {
        callback: function (err, xhr) {
          if (err !== null) {
            if (xhr !== null) {
              console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
              // TODO: do something with error, didn't save statement
              return;
            }

            console.log("Failed to save statement: " + err);
            // TODO: do something with error, didn't save statement
            return;
          }

          console.log("Statement saved");
          // TOOO: do something with success (possibly ignore)
        }
    }
  );*/
  }


        // This helper function helps to generate the human readable
        // time in the statement
        timeString(time): string {
          //expecting seconds
          // multiply by 1000 because Date() requires miliseconds
          var date = new Date(time * 1000);
          var hh = date.getUTCHours();
          var hhString = '';
          var mm = date.getUTCMinutes();
          var mmString = '';
          var ss = date.getSeconds();
          var ssString = '';
          var ms = date.getMilliseconds();
          var msString = '';
          // If you were building a timestamp instead of a duration,
          // you would uncomment the following line to get 12-hour (not 24) time
          // if (hh > 12) {hh = hh % 12;}
          // These lines ensure you have two-digits
          if (hh < 10) {hhString = "0"+hh;}
          if (mm < 10) {mmString = "0"+mm;}
          if (ss < 10) {ssString = "0"+ss;}
          // This formats your string to HH:MM:SS
          return hhString + ":" + mmString + ":" + ssString + ":" + msString;
        }
}
