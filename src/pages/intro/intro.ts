import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Slides, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { StatementService } from '../../services/statementgen.service';

@Component({
  templateUrl: 'intro.html'
})

export class IntroPage {
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public afAuth: AngularFireAuth,
    public events: Events,
    public statement: StatementService,
    private _storage: Storage,) {
      //initialize your page here
      afAuth.authState.subscribe( user => {
        if (user) {
          this.userProfile = user;
          this.statement.giveCreds(this.userProfile.displayName, this.userProfile.email, "Kristin Anthony", "kristin@knanthony.com");
        }
      });
  }
  @ViewChild(Slides) slideShow: Slides;
  slidePercentage: number;
  introComplete: boolean = false;
  userProfile: any = null;

  slides = [
    {
      title: "User Experience Design",
      description: "You keep yourself up-to-date on the latest trends, and you’ve heard a lot about UX. It sounds good and you want to incorporate it into the way you design learning experiences. But where do you start?",
      image: "assets/icons/IntroSlide1.png",
    },
    {
      title: "How Can you get Started?",
      description: "Maybe you feel like you don’t have the budget for it, or maybe your projects are moving so rapidly, that you don’t know where you’d find the time to incorporate any new best practices into your processes.",
      image: "assets/icons/Question.png",
    },
    {
      title: "UX + LX",
      description: "<b>UX + LX</b> offers bite-sized lessons and resources to get you started implementing the lessons from User Experience into Learning Experience design.",
      image: "assets/icons/IntroSlide3.png",
    }
  ];

  getSlideProgress() {
    let currentIndex = this.slideShow.getActiveIndex() + 1;
    // Get percentage completion
    this.slidePercentage = this.slideShow.getActiveIndex()/(this.slideShow.length() - 1) * 100;
    this.statement.introProgressed(currentIndex, this.slideShow.length(), this.slidePercentage);

    this._storage.set('currentIntroSlide', currentIndex);

    if(this.slideShow.isEnd()) {
      this.introComplete = true;
      this._storage.set('introComplete', true);
    }
  }

  introSlidesComplete() {
    this._storage.get('introComplete').then((val) => {
      if (!val) {
        this.statement.completedIntro(this.slidePercentage);
      }
    });
  }

  goHome() {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.navCtrl.setRoot('LoginPage');
      }
      this._storage.set('hasSeenTutorial', true);
    });
  }

}
