import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the FiltroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtro',
  templateUrl: 'filtro.html',
})
export class FiltroPage {

  regiones:any;
  comunas:any;
  id_publicacion:any;

  constructor(public navCtrl: NavController, public http: Http) {

    this.http.get('https://apis.digital.gob.cl/dpa/regiones')
    .map(response => response.json())
    .subscribe(data =>
      {
        this.regiones = data;
        console.log(data);
      },
      err => {
        console.log("Oops!");
      }
    );

    this.http.get('https://apis.digital.gob.cl/dpa/regiones/'+"04")
    .map(response => response.json())
    .subscribe(data2 =>
      {
        this.comunas = data2;
        console.log(data2);
      },
      err => {
        console.log("Oops!");
      }
    );




  }

  irHome(){
    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltroPage');
  }

}
