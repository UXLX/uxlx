import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Lesson1Page } from '../lesson1/lesson1';
import { Lesson2Page } from '../lesson2/lesson2';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  getUpdatedProgress: any;
  lesson1Progress: number = 0;
  lesson1Complete: boolean = false;
  lesson2Progress: number = 0;
  lesson2Complete: boolean = false;
  public userProfile:any = null;
  googleLogin():void {
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
}

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public events: Events,
  private _storage: Storage,
  private _googlePlus: GooglePlus) {
    this.loadProgress();
    //this._storage.clear();

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        //user.email gets the email
        console.log(user);
        this.userProfile = user;
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
