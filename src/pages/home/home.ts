import { Component } from '@angular/core';
import { Platform, NavController, NavParams, Events } from 'ionic-angular';
import { Lesson1Page } from '../lesson1/lesson1';
import { Lesson2Page } from '../lesson2/lesson2';
import { Storage } from '@ionic/storage';
import TinCan from 'tincanjs';
import { LRSService } from '../../services/lrs.service';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LRSService],
})
export class HomePage {
  getUpdatedProgress: any;
  lesson1Progress: number = 0;
  lesson1Complete: boolean = false;
  lesson2Progress: number = 0;
  lesson2Complete: boolean = false;
  initialStatement: any;
  public userProfile: any = null;
    googleLogin():void {
      if (this.platform.is('cordova')) {
        this._googlePlus.login({
        'webClientId': '919887709507-11gl2nj4e10bip4ufu6ip3f8g2qm3gd8.apps.googleusercontent.com',
        'offline': true
        }).then( res => {
          const googleCredential = firebase.auth.GoogleAuthProvider
              .credential(res.idToken);
          firebase.auth().signInWithCredential(googleCredential)
        .then( response => {
            console.log("Firebase success: " + JSON.stringify(response));
        });
        }, err => {
          console.error("Error: ", err)
        });
      } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then( () => {
          firebase.auth().getRedirectResult().then( result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token, user);
          }).catch(function(error) {
            // Handle Errors here.
            console.log(error.message);
          });
        });
      }
    }

  constructor(
  public navCtrl: NavController,
  public platform: Platform,
  public navParams: NavParams,
  public events: Events,
  public lrs: LRSService,
  private _storage: Storage,
  private _googlePlus: GooglePlus) {
    this.loadProgress();
    //this._storage.clear();

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        //user.email gets the email
        console.log(user);
        this.userProfile = user;
        this.initialStatement = new TinCan.Statement({
            actor: {
                name: user.displayName,
                mbox: user.email,
            },
            verb: {
                id: "https://brindlewaye.com/xAPITerms/verbs/loggedin/",
                display: {'en-US': 'logged in to'}
            },
            "object": {
              "id": "http://example.com/activities/ux-lx-app",
                "definition": {
                  "type": "http://activitystrea.ms/schema/1.0/application",
                  "name": { "en-US": "UX + LX app" }
                }
            },
        });
        this.lrs.lrs.saveStatement(
          this.initialStatement,
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
      } else {
        this.userProfile = null;
        console.log("There's no user here");
      }
    });
  }

  loadProgress(): void {
    var that = this; // Reference the class instance
    this.events.subscribe('lessonProgress', function(this, data) {
      that._storage.set('loadLesson1Progress', data.lesson1Progress);
    });
    this.events.subscribe('lesson2Progress', function(this, data) {
      that._storage.set('loadLesson2Progress', data.lesson2Progress);
    });
  };

  lessonOne() {
    this.navCtrl.setRoot(Lesson1Page)
  }

  lessonTwo() {
    this.navCtrl.setRoot(Lesson2Page)
  }

  ionViewDidLoad(){
    this._storage.get('lesson1Complete').then((val) => {
      this.lesson1Complete = val;
    });
    this._storage.get('loadLesson1Progress').then((val) => {
      this.lesson1Progress = parseInt(val);
    });
    this._storage.get('lesson2Complete').then((val) => {
      this.lesson2Complete = val;
    });
    this._storage.get('loadLesson2Progress').then((val) => {
      this.lesson2Progress = parseInt(val);
    });

  }
}
