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
  videoTinCan: any;
  ytEmbeddedVideoID: string;
  ytEmbeddedVideoTitle: string;
  lastPlayer2Time: string;
  lastPlayer2State: string;
  userEmail: string;
  userName: string;
  authorName: string;
  authorEmail: string;
  lessonNum: string;
  timeUpdater: any;
  videoCurrentTime: number;

  constructor(public lrs: LRSService) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //this.setupPlayer();
  }

  giveCreds (name, email, authorName, authorEmail, lessonNum) {
    this.userName = name;
    this.userEmail = email;
    this.authorName = authorName;
    this.authorEmail = authorEmail;
    this.lessonNum = lessonNum;
  }

  bindPlayer(elementId): void {
    this.youtube.playerId = elementId;
  };

  createPlayer(): void {
    console.log("create new player");
    var video;
    video = new window['YT'].Player(this.youtube.playerId, {
      height: this.youtube.playerHeight,
      width: this.youtube.playerWidth,
      playerVars: {
        rel: 0,
        showinfo: 0
      },
      videoId: this.youtube.videoId,
      events: {
        "onStateChange": this.onPlayerStateChange.bind(this)
      }
    });
    console.log(video);
    return video;
  }

  loadPlayer(): void {
    if (this.youtube.ready && this.youtube.playerId) {
      if (this.youtube.player) {
        this.youtube.player.destroy();
      }
      this.youtube.player = this.createPlayer();
    }
  }

  setupPlayer(playerId) {
    //we need to check if the api is loaded
    window['onYouTubeIframeAPIReady'] = () => {
      if (window['YT']) {
        this.youtube.ready = true;
        console.log(this.youtube.ready);
        this.bindPlayer(playerId);
        this.loadPlayer();
      }
    };
    if (window['YT'] && window['YT'].Player) {
      this.youtube.ready = true;
      console.log(this.youtube.ready);
      this.bindPlayer(playerId);
      this.loadPlayer();
    }
  }

  launchPlayer(videoId, playerId): void {
    this.youtube.videoId = videoId;
    // for multiple youtube videos to work, each playerId (div id) must be unique
    this.setupPlayer(playerId);
  }

  onPlayerStateChange(event): void {
    var self = this;
    self.ytEmbeddedVideoID = 'http://www.youtube.com/watch?v=' + self.youtube.player.getVideoData()['video_id'];
    self.ytEmbeddedVideoTitle = self.youtube.player.getVideoData().title;
    function updateTime() {
      if(self.youtube.player.getCurrentTime) {
        self.videoCurrentTime = self.youtube.player.getCurrentTime();
      }
    }

    switch (event.data) {
      case (window['YT'].PlayerState.PLAYING):
        self.videoPlayed(self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
        self.timeUpdater = setInterval(updateTime, 1000);
        console.log("played");
        break;
      case (window['YT'].PlayerState.PAUSED):
        if (self.lastPlayer2State == window['YT'].PlayerState.PLAYING && Math.abs(self.youtube.player.getCurrentTime() - self.videoCurrentTime) <= 2) {
          self.videoWatched(self.lastPlayer2Time, self.youtube.player.getCurrentTime(), self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
          console.log("watched");
        } else {
          console.log([self.lastPlayer2Time, self.youtube.player.getCurrentTime()])
          self.videoSkipped(self.lastPlayer2Time, self.youtube.player.getCurrentTime(), self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
          console.log("skipped");
        }
        clearInterval(self.timeUpdater);
        break;
      case (window['YT'].PlayerState.ENDED):
        self.videoEnded(self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
        break;
      case (window['YT'].PlayerState.UNSTARTED):
        break;
    }
    console.log(self.lastPlayer2Time);
    self.lastPlayer2State = event.data;
  }

  videoPlayed(videoTitle, videoUrl, lessonNum) {
    var self = this;
    const videoTinCan = new TinCan.Statement({
    "actor": {
      name: self.userName,
      mbox: self.userEmail,
    },
    "verb": {
       id: "http://activitystrea.ms/schema/1.0/play",
       display: {'en-US': 'played'}
    },
    "object": {
       id: videoUrl,
       definition: {
          name: { "en-US": videoTitle },
       }
    },
    "context": {
      "contextActivities": {
        "parent": {
          "id": "http://www.lxresearch.info/app/ux-lx-app/" + self.lessonNum
        },
      },
      "extensions": {
        "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
          "name": self.authorName,
          "mbox": "mailto:" + self.authorEmail
        },
      }
    },
  });
    console.log(videoTinCan);
    self.lastPlayer2Time = self.youtube.player.getCurrentTime();
    /*self.lrs.lrs.saveStatement(
     videoTinCan,
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

  videoWatched(start, finish, videoTitle, videoUrl, lessonNum) {//start and finish in seconds
    var self = this;
    const videoTinCan = new TinCan.Statement({
        "actor": {
          name: self.userName,
          mbox: self.userEmail,
        },
        "verb": {
          id: "http://activitystrea.ms/schema/1.0/watch",
          display: {'en-US': 'watched'}
        },
        "object": {
          id: videoUrl,
          definition: {
              name: { "en-US": videoTitle + " from " + self.timeString(start) + " to " + self.timeString(finish) },
              extensions: {
                  "http://id.tincanapi.com/extension/starting-point": self.timeString(start),
                  "http://id.tincanapi.com/extension/ending-point": self.timeString(finish)
              }
          }
        },
        "context": {
          "contextActivities": {
            "parent": {
              "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum
            },
          },
          "extensions": {
            "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
              "name": self.authorName,
              "mbox": "mailto:" + self.authorEmail
            },
          }
        },
    });
    console.log(videoTinCan);
    self.lastPlayer2Time = self.youtube.player.getCurrentTime();
    /*self.lrs.lrs.saveStatement(
      videoTinCan,
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

  videoSkipped(start, finish, videoTitle, videoUrl, lessonNum) {//start and finish in seconds
    var self = this;
    const videoTinCan = new TinCan.Statement({
        "actor": {
          name: self.userName,
          mbox: self.userEmail,
        },
        "verb": {
            id: "http://id.tincanapi.com/verb/skipped",
            display: {'en-US': 'skipped'}
        },
        "object": {
          id: videoUrl,
          definition: {
            name: { "en-US": videoTitle + " from " + self.timeString(start) + " to " + self.timeString(finish) },
            extensions: {
                "http://id.tincanapi.com/extension/starting-point": self.timeString(start),
                "http://id.tincanapi.com/extension/ending-point": self.timeString(finish)
            }
          }
        },
        "context": {
          "contextActivities": {
            "parent": {
              "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum
            },
          },
          "extensions": {
            "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
              "name": self.authorName,
              "mbox": "mailto:" + self.authorEmail
            },
          }
        },
    });
    console.log(videoTinCan);
    self.lastPlayer2Time = self.youtube.player.getCurrentTime();
    /*self.lrs.lrs.saveStatement(
      videoTinCan,
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

  videoEnded(videoTitle, videoUrl, lessonNum) {
    var self = this;
    const videoTinCan = new TinCan.Statement({
      "actor": {
        name: self.userName,
        mbox: self.userEmail,
       },
      "verb": {
        id: "http://activitystrea.ms/schema/1.0/complete",
        display: {'en-US': 'finished watching'}
      },
      "object": {
        id: videoUrl,
        definition: {
          name: { "en-US": videoTitle },
        }
      },
      "context": {
        "contextActivities": {
          "parent": {
            "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum
          },
        },
        "extensions": {
          "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
            "name": self.authorName,
            "mbox": "mailto:" + self.authorEmail
          },
        }
      },
   });
   console.log(videoTinCan);

   /*self.lrs.lrs.saveStatement(
     videoTinCan,
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
    console.log(time);
    // multiply by 1000 because Date() requires milliseconds
    var date = new Date(time * 1000);
    console.log(date);
    var hh = date.getUTCHours();
    var hhString = '';
    var mm = date.getUTCMinutes();
    var mmString = '';
    var ss = date.getSeconds();
    var ssString = '';
    // If you were building a timestamp instead of a duration,
    // you would uncomment the following line to get 12-hour (not 24) time
    // if (hh > 12) {hh = hh % 12;}
    // These lines ensure you have two-digits
    if (hh < 10) {
      hhString = "0"+hh;
    } else {
      hhString += hh;
    }
    if (mm < 10) {
      mmString = "0"+mm;
    } else {
      mmString += mm;
    }
    if (ss < 10) {
      ssString = "0"+ss;
    } else {
      ssString += ss;
    }
    // This formats your string to HH:MM:SS
    return hhString + ":" + mmString + ":" + ssString;
  }
}
