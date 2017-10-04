import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public authProvider: AuthProvider) {}

  presentLoading() {
    const loading = this.loadingCtrl.create({
      content: 'Reticulating splines...',
      spinner: 'bubbles'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  ionViewWillLeave() {
    this.presentLoading();
  }

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
