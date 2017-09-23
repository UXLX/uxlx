import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public authProvider: AuthProvider) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  googleLogin(): void {
    this.authProvider.googleLogin();
  }

  twitterLogin(): void {
    this.authProvider.twitterLogin();
  }


}
