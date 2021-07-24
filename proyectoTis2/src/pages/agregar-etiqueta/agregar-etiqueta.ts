import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AgregarEtiquetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-etiqueta',
  templateUrl: 'agregar-etiqueta.html',
})
export class AgregarEtiquetaPage {

  publicacion: any;
  publicacionesDes: any;
  etiqueta: any;
  id= this.navParams.get('valor');

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http ) {
    console.log(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarEtiquetaPage');
  }


  crearEtiqueta(){

    let postData = new FormData();
    postData.append('etiqueta', this.etiqueta);
    postData.append('id_publicacion',this.id);

    this.http.post('http://localhost/apiRest/public/etiqueta/new',postData)
    .map(response => response.json())
    .subscribe(data =>
      {
        console.log(data);
        this.etiqueta="";
        postData= null;
      },
      err => {
        console.log("Oops!");
        this.etiqueta="";
        postData= null;

        //AQUI PODRIAN PONER UN TOAST??? que diga ETIQUETA NO VALIDA O ALGO ASI
      }
      );
  }

  irHome(){
    //AQUI PODRIAN PONER UN TOAST??? que diga PUBLICACION EN ESPERA DE APROBACION
    this.navCtrl.setRoot(HomePage);
  }

}
