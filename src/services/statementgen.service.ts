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
          "name": { "en-US": "Slide " + slideNum + " of " + slideTotal },
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

    console.log(lessonProgress);
  }

  questionAnswered (lessonNum, questionNum, slideNum, answerChosen, lessonProgress) {
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
          "name": { "en-US": "Question " + questionNum + " on Slide " + slideNum },
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
        "success": true,
        "response": answerChosen
      }
    });

    console.log(assessment);
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

    console.log(completeLesson);
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

    console.log(linkFire);
    this.platform.ready().then(() => {
      this.iab.create(url, "_system", "location=true");
    });
  }


}
