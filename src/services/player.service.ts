import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
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
  lastTime: number = -1;
  userEmail: string;
  userName: string;
  authorName: string;
  authorEmail: string;
  lessonNum: string;
  start_count: number = 0;
  timeUpdater: any;
  videoCurrentTime: number;
  audioLastTime: number;
  audioCurrentTime: number;

  constructor(
    public platform: Platform,
    public lrs: LRSService,
    public events: Events) {
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
    window['onYouTubeIframeAPIReady'] = ()=> {
      if (window['YT']) {
        this.youtube.ready = true;
        this.bindPlayer(playerId);
        this.loadPlayer();
      }
    };
    if (window['YT'] && window['YT'].Player) {
      this.youtube.ready = true;
      this.bindPlayer(playerId);
      this.loadPlayer();
    }
  }

  launchPlayer(videoId, playerId): void {
    this.lastTime = -1;
    this.clearUpdateTimer();
    this.youtube.videoId = videoId;
    // for multiple youtube videos to work, each playerId (div id) must be unique
    this.setupPlayer(playerId);
  }

  onPlayerStateChange(event): void {
    var self = this;
    self.ytEmbeddedVideoID = 'http://www.youtube.com/watch?v=' + self.youtube.player.getVideoData()['video_id'];
    self.ytEmbeddedVideoTitle = self.youtube.player.getVideoData().title;
    let updateTime = ()=> {
      if(self.youtube.player.getCurrentTime && self.lastTime !== -1) {
        if (Math.abs(self.youtube.player.getCurrentTime() - self.lastTime) >= 2) {
          // console.log("seeked");
          if (self.lastPlayer2State == window['YT'].PlayerState.PLAYING) {
            self.videoSkipped(self.lastTime, self.youtube.player.getCurrentTime(), self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
          } else {
            self.videoSkipped(self.lastPlayer2Time, self.youtube.player.getCurrentTime(), self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
          }
        }
      }
      if(self.youtube.player.getCurrentTime && self.lastTime !== -1) {
        self.videoCurrentTime = self.youtube.player.getCurrentTime();
      }

      if(self.youtube.player.getCurrentTime) {
        self.lastTime = self.youtube.player.getCurrentTime();
      }
    }

    switch (event.data) {
      case (window['YT'].PlayerState.PLAYING):
        // console.log("playing");
        self.videoPlayed(self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
        // use interval to check time every second;
        // helps to accurately check difference between time before skip and current time
        this.start_count+=1;
        if(this.start_count==1){
          self.timeUpdater = setInterval(updateTime, 1000);
        }
        break;
      case (window['YT'].PlayerState.PAUSED):
        // If the video was playing and the difference between the last time and the current time is less than or equal to 2 seconds
        // then assume that the user watched the video
        if (self.lastPlayer2State == window['YT'].PlayerState.PLAYING && Math.abs(self.youtube.player.getCurrentTime() - self.lastTime) <= 2) {
          //console.log("paused");
          self.videoPaused(self.lastPlayer2Time, self.youtube.player.getCurrentTime(), self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
        } else if (!this.platform.is('cordova') && Math.abs(self.youtube.player.getCurrentTime() - self.lastTime) >= 2) {
          //console.log("seeked");
          self.videoSkipped(self.lastPlayer2Time, self.youtube.player.getCurrentTime(), self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
        }
        break;
      case (window['YT'].PlayerState.ENDED):
        self.videoEnded(self.ytEmbeddedVideoTitle, self.ytEmbeddedVideoID, self.lessonNum);
        this.clearUpdateTimer();
        break;
      case (window['YT'].PlayerState.UNSTARTED):
        break;
    }
    self.lastPlayer2State = event.data;
  }

  clearUpdateTimer() {
    this.start_count=0;
    window.clearInterval(this.timeUpdater);
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
    //console.log(videoTinCan.target.definition.name);
    self.lastPlayer2Time = self.youtube.player.getCurrentTime();
    self.lrs.lrs.saveStatement(
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
    );
  }

  videoPaused(start, finish, videoTitle, videoUrl, lessonNum) {//start and finish in seconds
    var self = this;
    const videoTinCan = new TinCan.Statement({
        "actor": {
          name: self.userName,
          mbox: self.userEmail,
        },
        "verb": {
          id: "http://id.tincanapi.com/verb/paused",
          display: {'en-US': 'paused'}
        },
        "object": {
          id: videoUrl,
          definition: {
              name: { "en-US": videoTitle },
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
    //console.log([self.timeString(start), self.timeString(finish)]);
    self.lastPlayer2Time = self.youtube.player.getCurrentTime();
    self.lrs.lrs.saveStatement(
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
    );
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
            name: { "en-US": videoTitle },
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
    //console.log([self.timeString(start), self.timeString(finish)]);
    self.lastPlayer2Time = self.youtube.player.getCurrentTime();
    self.lrs.lrs.saveStatement(
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
    );
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
   //console.log(videoTinCan.target.definition.name);
   self.lrs.lrs.saveStatement(
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
   );
  }

  podcastPlayed(audioTitle, audioUrl, podcastTitle, podcastEpisodeNum, podcastAuthor) {
    var self = this;
    const audioTinCan = new TinCan.Statement({
      "actor": {
        name: self.userName,
        mbox: self.userEmail,
      },
      "verb": {
         id: "http://activitystrea.ms/schema/1.0/play",
         display: {'en-US': 'played'}
      },
      "object": {
        id: audioUrl,
        definition: {
          name: { "en-US": audioTitle },
          "extensions": {
            "http://www.lxresearch.info/app/ux-lx-app/extension/podcast": {
              "podcast": podcastTitle,
              "podcastEpisode": podcastEpisodeNum,
              "podcastHost": podcastAuthor
            }
          }
        },
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
          }
        }
      },
    });
    //console.log(audioTinCan);
    self.lrs.lrs.saveStatement(
     audioTinCan,
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
    );
  }

  podcastPaused(start, finish, audioTitle, audioUrl, podcastTitle, podcastEpisodeNum, podcastAuthor) {//start and finish in seconds
    var self = this;
    const audioTinCan = new TinCan.Statement({
      "actor": {
        name: self.userName,
        mbox: self.userEmail,
      },
      "verb": {
        id: "http://id.tincanapi.com/verb/paused",
        display: {'en-US': 'paused'}
      },
      "object": {
        id: audioUrl,
        definition: {
          name: { "en-US": audioTitle},
          "extensions": {
            "http://id.tincanapi.com/extension/starting-point": self.timeString(start),
            "http://id.tincanapi.com/extension/ending-point": self.timeString(finish),
            "http://www.lxresearch.info/app/ux-lx-app/extension/podcast": {
              "podcast": podcastTitle,
              "podcastEpisode": podcastEpisodeNum,
              "podcastHost": podcastAuthor
            }
          }
        },
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
    //console.log(audioTinCan);
    self.lrs.lrs.saveStatement(
      audioTinCan,
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
    );
  }

  podcastSeeked(start, finish, audioTitle, audioUrl, podcastTitle, podcastEpisodeNum, podcastAuthor) {//start and finish in seconds
    var self = this;
    const audioTinCan = new TinCan.Statement({
      "actor": {
        name: self.userName,
        mbox: self.userEmail,
      },
      "verb": {
        id: "http://id.tincanapi.com/verb/skipped",
        display: {'en-US': 'skipped'}
      },
      "object": {
        id: audioUrl,
        definition: {
          name: { "en-US": audioTitle },
          "extensions": {
            "http://id.tincanapi.com/extension/starting-point": self.timeString(start),
            "http://id.tincanapi.com/extension/ending-point": self.timeString(finish),
            "http://www.lxresearch.info/app/ux-lx-app/extension/podcast": {
              "podcast": podcastTitle,
              "podcastEpisode": podcastEpisodeNum,
              "podcastHost": podcastAuthor
            }
          }
        },
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
    //console.log(audioTinCan);
    self.lrs.lrs.saveStatement(
      audioTinCan,
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
    );
  }

  podcastEnded(audioTitle, audioUrl, podcastTitle, podcastEpisodeNum, podcastAuthor) {
    var self = this;
    const audioTinCan = new TinCan.Statement({
      "actor": {
        name: self.userName,
        mbox: self.userEmail,
      },
      "verb": {
        id: "http://activitystrea.ms/schema/1.0/complete",
        display: {'en-US': 'finished playing'}
      },
      "object": {
        id: audioUrl,
        definition: {
          name: { "en-US": audioTitle },
          "extensions": {
            "http://www.lxresearch.info/app/ux-lx-app/extension/podcast": {
              "podcast": podcastTitle,
              "podcastEpisode": podcastEpisodeNum,
              "podcastHost": podcastAuthor
            }
          }
        },
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
          }
        }
      },
    });
    //console.log(audioTinCan);
    self.lrs.lrs.saveStatement(
     audioTinCan,
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
    );
  }

  // This helper function helps to generate the human readable
  // time in the statement
  timeString(time): string {
    //expecting seconds
    // multiply by 1000 because Date() requires milliseconds
    var date = new Date(time * 1000);
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
