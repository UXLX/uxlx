import { Component } from '@angular/core';
import { Platform, NavController, NavParams, Events } from 'ionic-angular';
import { Lesson1Page } from '../lesson1/lesson1';
import { Lesson2Page } from '../lesson2/lesson2';
import { Storage } from '@ionic/storage';
import TinCan from 'tincanjs';
import { StatementService } from '../../services/statementgen.service';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StatementService],
})
export class HomePage {
  getUpdatedProgress: any;
  lesson1Progress: number = 0;
  lesson1Complete: boolean = false;
  lesson2Progress: number = 0;
  lesson2Complete: boolean = false;
  initialStatement: any;
  public userProfile: any = null;

  constructor(
  public navCtrl: NavController,
  public platform: Platform,
  public navParams: NavParams,
  public events: Events,
  public statement: StatementService,
  public afAuth: AngularFireAuth,
  private _storage: Storage) {
    this.loadProgress();
    //this._storage.clear();
    afAuth.authState.subscribe( user => {
      if (user) {
        this.userProfile = user;
        this.statement.giveCreds(this.userProfile.displayName, this.userProfile.email, "Kristin Anthony", "kristin@knanthony.com");
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
    this.statement.launchedLesson("Lesson 1: What is UX and Why do I Need it?", "lesson1", this.lesson1Progress);
    this.navCtrl.setRoot(Lesson1Page, {
      userName: this.userProfile.displayName,
      userEmail: this.userProfile.email,
    });
  }

  lessonTwo() {
    this.statement.launchedLesson("Lesson 2: Which One's Which?", "lesson2", this.lesson2Progress);
    this.navCtrl.setRoot(Lesson2Page, {
      userName: this.userProfile.displayName,
      userEmail: this.userProfile.email,
    });
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
