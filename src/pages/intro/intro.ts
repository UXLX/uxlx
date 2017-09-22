import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'intro.html'
})

export class IntroPage {
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public afAuth: AngularFireAuth,
    private _storage: Storage,) {
      //initialize your page here
  }
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
