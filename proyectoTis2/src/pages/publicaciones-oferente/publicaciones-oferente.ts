import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { PublicacionPage } from '../publicacion/publicacion';

@IonicPage()
@Component({
  selector: 'page-publicaciones-oferente',
  templateUrl: 'publicaciones-oferente.html'
})
export class PublicacionesOferentePage {

  publicaciones:any;
  oferente = this.navParams.get('valor');
  data:Observable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.http.get('http://localhost/apiRest/public/usuario_publicacion/'+this.oferente)
    .map(response => response.json())
    .subscribe(data =>
      {
        this.publicaciones = data;

        console.log(data);
      },
      err => {
        console.log("Oops!");
      }
    );

  }

  irPublicacion(id_publicacion){
    this.navCtrl.push(PublicacionPage, {valor: id_publicacion});
  }
  


}
