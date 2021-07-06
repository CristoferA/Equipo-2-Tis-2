import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisPublicacionesPage } from '../mis-publicaciones/mis-publicaciones';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');
  }

  irMisPublicaciones(){
    this.navCtrl.push(MisPublicacionesPage);
  }
  irHome() {
    this.navCtrl.setRoot(HomePage);
  }

  cerrar(){
      localStorage.clear();
      this.irHome();
  }


}