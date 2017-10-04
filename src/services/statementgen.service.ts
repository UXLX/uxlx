import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import TinCan from 'tincanjs';
import { LRSService } from './lrs.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class StatementService {
  userEmail: string;
  userName: string;
  authorName: string;
  authorEmail: string;

  constructor(
    public platform: Platform,
    public lrs: LRSService,
    public iab: InAppBrowser) {
  }

  giveCreds (name, email, authorName, authorEmail) {
    this.userName = name;
    this.userEmail = email;
    this.authorName = authorName;
    this.authorEmail = authorEmail;
  }

  // base url http://www.lxresearch.info/app/ux-lx-app/

  launchApp() {
    var initialStatement = new TinCan.Statement({
        "actor": {
          name: this.userName,
          mbox: this.userEmail,
        },
        "verb": {
            id: "https://brindlewaye.com/xAPITerms/verbs/loggedin/",
            display: {'en-US': 'logged in to'}
        },
        "object": {
          "id": "http://www.lxresearch.info/app/ux-lx-app/",
            "definition": {
              "type": "http://activitystrea.ms/schema/1.0/application",
              "name": { "en-US": "UX + LX app" }
            }
        },
    });
    //console.log(initialStatement);
    this.lrs.lrs.saveStatement(
      initialStatement,
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
          // TODO: do something with success (possibly ignore)
        }
      }
    );
  }

  launchOnboarding() {
    var launchIntro = new TinCan.Statement({
      "actor": {
        name: this.userName,
        mbox: this.userEmail,
      },
      "verb": {
          id: "http://adlnet.gov/expapi/verbs/launched",
          display: {'en-US': 'launched'}
      },
      "object": {
        "id": "http://www.lxresearch.info/app/ux-lx-app/app-onboarding",
        "definition": {
          "type": "http://activitystrea.ms/schema/1.0/page",
          "name": { "en-US": "App Onboarding" },
        },
      },
    });
    //console.log(launchIntro);
    this.lrs.lrs.saveStatement(
     launchIntro,
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

  introProgressed (slideNum, slideTotal, introProgress) {
    if (isNaN(introProgress)) {
      introProgress = 0;
    }
    var launchIntro = new TinCan.Statement({
      "actor": {
        name: this.userName,
        mbox: this.userEmail,
      },
      "verb": {
        id: "http://id.tincanapi.com/verb/viewed",
        display: {'en-US': 'viewed'}
      },
      "object": {
        "id": "http://www.lxresearch.info/app/ux-lx-app/app-onboarding" + "/slides/slide-" + slideNum,
        "definition": {
          "type": "http://id.tincanapi.com/activitytype/slide",
          "name": { "en-US": "Slide " + slideNum + " of " + slideTotal + " in App Onboarding" },
        },
      },
      "context": {
        "contextActivities": {
          "parent": {
            "id": "http://www.lxresearch.info/app/ux-lx-app/app-onboarding"
          },
        },
        "extensions": {
          "http://www.lxresearch.info/app/ux-lx-app/extension/intro-progress": introProgress + "%",
          "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
            "name": this.authorName,
            "mbox": "mailto:" + this.authorEmail
          },
        }
      },
    });
    //console.log(launchIntro);
    this.lrs.lrs.saveStatement(
     launchIntro,
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

  completedIntro (introProgress) {
    var completeIntro = new TinCan.Statement({
      "actor": {
          name: this.userName,
          mbox: this.userEmail,
      },
      "verb": {
          id: "http://adlnet.gov/expapi/verbs/completed",
          display: {'en-US': 'completed'}
      },
      "object": {
        "id": "http://www.lxresearch.info/app/ux-lx-app/app-onboarding",
        "definition": {
          "type": "http://activitystrea.ms/schema/1.0/page",
          "name": { "en-US": "App Onboarding" },
        },
      },
    });
    //console.log(completeIntro);
    this.lrs.lrs.saveStatement(
     completeIntro,
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

  launchedLesson (lessonTitle, lessonNum, lessonProgress) {
    if (isNaN(lessonProgress)) {
      lessonProgress = 0;
    }
    var launchLesson = new TinCan.Statement({
      "actor": {
        name: this.userName,
        mbox: this.userEmail,
      },
      "verb": {
          id: "http://adlnet.gov/expapi/verbs/launched",
          display: {'en-US': 'launched'}
      },
      "object": {
        "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum,
        "definition": {
          "type": "http://adlnet.gov/expapi/activities/course",
          "name": { "en-US": lessonTitle },
        },
      },
      "context": {
        "contextActivities": {
          "parent": {
            "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum
          },
        },
        "extensions": {
          "http://www.lxresearch.info/app/ux-lx-app/extension/lesson-progress": lessonProgress + "%",
          "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
            "name": this.authorName,
            "mbox": "mailto:" + this.authorEmail
          },
        }
      },
    });
    //console.log(launchLesson);
    this.lrs.lrs.saveStatement(
     launchLesson,
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

  lessonProgressed (lessonNum, slideNum, slideTotal, lessonProgress) {
    // lessonNum should be in the form of "lesson1"; slideNum should be in the form of "1"
    var lessonProgress = new TinCan.Statement({
      "actor": {
        name: this.userName,
        mbox: this.userEmail,
      },
      "verb": {
        id: "http://id.tincanapi.com/verb/viewed",
        display: {'en-US': 'viewed'}
      },
      "object": {
        "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum + "/slides/slide-" + slideNum,
        "definition": {
          "type": "http://id.tincanapi.com/activitytype/slide",
          "name": { "en-US": "Slide " + slideNum + " of " + slideTotal + " in " + lessonNum },
        },
      },
      "context": {
        "contextActivities": {
          "parent": {
            "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum
          },
        },
        "extensions": {
          "http://www.lxresearch.info/app/ux-lx-app/extension/lesson-progress": lessonProgress + "%",
          "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
            "name": this.authorName,
            "mbox": "mailto:" + this.authorEmail
          },
        }
      },
    });
    //console.log(lessonProgress);
    this.lrs.lrs.saveStatement(
     lessonProgress,
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

  questionAnswered (lessonNum, questionNum, slideNum, answerChosen, isCorrect, lessonProgress) {
    // lessonNum should be in the form of "lesson1"; questionNum should be in the form of "1"
    var assessment = new TinCan.Statement({
      "actor": {
        name: this.userName,
        mbox: this.userEmail,
      },
      "verb": {
        id: "http://adlnet.gov/expapi/verbs/answered",
        display: {'en-US': 'answered'}
      },
      "object": {
        "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum + "/questions/question-" + questionNum,
        "definition": {
          "type": "http://activitystrea.ms/schema/1.0/question",
          "name": { "en-US": "Question " + questionNum + " on Slide " + slideNum + " in " + lessonNum },
        },
      },
      "context": {
        "contextActivities": {
          "parent": {
            "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum
          },
        },
        "extensions": {
          "http://www.lxresearch.info/app/ux-lx-app/extension/lesson-progress": lessonProgress + "%",
          "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
            "name": this.authorName,
            "mbox": "mailto:" + this.authorEmail
          },
        }
      },
      "result": {
        "completion": true,
        "success": isCorrect,
        "response": answerChosen
      }
    });
    //console.log(assessment);
    this.lrs.lrs.saveStatement(
     assessment,
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

  completedLesson (lessonNum, lessonProgress) {
    // lessonNum should be in the form of "lesson1"
    var completeLesson = new TinCan.Statement({
      "actor": {
          name: this.userName,
          mbox: this.userEmail,
      },
      "verb": {
          id: "http://adlnet.gov/expapi/verbs/completed",
          display: {'en-US': 'completed'}
      },
      "object": {
        "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum,
        "definition": {
          "type": "http://adlnet.gov/expapi/activities/course",
          "name": { "en-US": "Lesson 1: What is UX and Why do I Need it?" },
          "extensions": {
            "http://www.lxresearch.info/app/ux-lx-app/extension/lesson-progress": lessonProgress + "%"
          }
        },
      },
      "context": {
        "extensions": {
          "http://www.lxresearch.info/app/ux-lx-app/extension/lesson-progress": lessonProgress + "%",
          "http://www.lxresearch.info/app/ux-lx-app/extension/author": {
            "name": this.authorName,
            "mbox": "mailto:" + this.authorEmail
          }
        }
      },
    });
    //console.log(completeLesson);
    this.lrs.lrs.saveStatement(
     completeLesson,
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

  launchLink(lessonNum, url, title) {
    // lessonNum should be in the form of "lesson1"
    var linkFire = new TinCan.Statement({
      "actor": {
          name: this.userName,
          mbox: this.userEmail,
      },
      "verb": {
          id: "http://activitystrea.ms/schema/1.0/open",
          display: {'en-US': 'opened'}
      },
      "object": {
        "id": url,
        "definition": {
          "type": "http://adlnet.gov/expapi/activities/link",
          "name": { "en-US": title },
        },
      },
      "context": {
        "contextActivities": {
          "parent": {
            "id": "http://www.lxresearch.info/app/ux-lx-app/" + lessonNum
          },
        },
      }
    });
    //console.log(linkFire);
    this.lrs.lrs.saveStatement(
     linkFire,
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
    this.platform.ready().then(() => {
      this.iab.create(url, "_system", "location=true");
    });
  }
}
