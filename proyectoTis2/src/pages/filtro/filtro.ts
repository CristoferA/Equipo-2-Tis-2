import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BusquedaPage } from '../busqueda/busqueda';

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
  regionS:any;

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
   
  }

  onOptionsSelected(value:string){
    console.log("Region seleccionada tiene codigo " + value);

    this.http.get('https://apis.digital.gob.cl/dpa/regiones/'+value+'/comunas')
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

  irBusqueda(){
    this.navCtrl.push(BusquedaPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltroPage');
  }

}
