import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  irRegistro(){
    this.navCtrl.push(RegistroPage);
  }

  irHome(){
    this.navCtrl.push(HomePage);
  }
}
