import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  public userProfile:any = null;

  pages: Array<{title: string, component: any}>;
  googleSignOut():void {
    firebase.auth().signOut();
    this._googlePlus.logout();
    this.nav.goToRoot(this.rootPage);
  }

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _storage: Storage,
    private _screenOrientation: ScreenOrientation,
    private _googlePlus: GooglePlus) {
      // Check if the user has already seen the tutorial
      this._storage.get('hasSeenTutorial')
        .then((hasSeenTutorial) => {
          if (hasSeenTutorial) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = IntroPage;
          }
          this.initializeApp();
        });
      this._screenOrientation.lock(this._screenOrientation.ORIENTATIONS.PORTRAIT).catch(function() {
        console.log("screen lock orientation failed")
      });;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Getting Started', component: IntroPage },
    ];

    firebase.initializeApp({
        apiKey: "AIzaSyDjXOOsmjuq-k6m7_sLYsU9zX955154Eew",
        authDomain: "uxlx-3b266.firebaseapp.com",
        databaseURL: "https://uxlx-3b266.firebaseio.com/",
        projectId: "uxlx-3b266",
        storageBucket: "gs://uxlx-3b266.appspot.com",
        messagingSenderId: "919887709507",
      });

      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          var token = result.credential.accessToken;
          var user = result.user;
          //console.log(token, user);
        }
      }).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        console.log(errorMessage);
      });

      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          //user.email gets the email
          //console.log(user);
          this.userProfile = user;
        } else {
          console.log("There's no user here");
        }
      });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



}
