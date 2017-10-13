import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { StatementService } from '../services/statementgen.service';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  public userProfile: any = null;
  initialStatement: any;

  pages: Array<{title: string, component: any}>;
  signOut(): firebase.Promise<any> {
    let self = this;
    return this.afAuth.auth.signOut().then(() => {
      self._twitter.logout();
      self._googlePlus.logout();
    });
  }

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public statement: StatementService,
    private _storage: Storage,
    private _screenOrientation: ScreenOrientation,
    private _googlePlus: GooglePlus,
    private _twitter: TwitterConnect,
    public afAuth: AngularFireAuth) {
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

    afAuth.authState.subscribe( user => {
      if (user) {
        //user.email gets the email
        //console.log(user);
        this.userProfile = user;
        this.statement.giveCreds(this.userProfile.displayName, this.userProfile.email, "Kristin Anthony", "kristin@knanthony.com");
        this.statement.launchApp();
        this._storage.get('hasSeenTutorial').then((val) => {
          if (!val) {
            this.nav.setRoot(IntroPage);
          } else {
            this.nav.setRoot(HomePage);
          }
        });

      } else {
        this.nav.setRoot('LoginPage');
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
    this.afAuth.authState.subscribe( user => {
      if (page.title === "Home" && user || page.title !== "Home") {
        this.nav.setRoot(page.component);
        if(page.title === "Getting Started" && user) {
          this.statement.launchOnboarding();
        }
      } else if  (page.title === "Home" && !user) {
        this.nav.setRoot('LoginPage');
      }
    });
  }



}
