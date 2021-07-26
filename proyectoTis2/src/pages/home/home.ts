import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PublicacionPage } from '../publicacion/publicacion';
import { FiltroPage } from '../filtro/filtro';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  publicacionesDes: any;
  id_publicacion = this.navParams.get('valor');
  estado: any;
  data: Observable<any>;


  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {

    this.http.get('http://localhost/apiRest/public/publicacion')
      .map(response => response.json())
      .subscribe(data => {

        this.publicacionesDes = data;

      },
        err => {
          console.log("Oops!");
        }
      );

  }

  irPublicacion(id_publicacion) {

    let postData = new FormData();

    if ('respuesta' in localStorage) {
      var respuesta = JSON.parse(localStorage.getItem('respuesta'));
      var id_usuario = respuesta.data.id_usuario;
      console.log(id_usuario);

      var url = 'http://localhost/apiRest/public/historial_publicacion/new';

      postData.append('id_usuario', id_usuario);
      postData.append('id_publicacion', id_publicacion);
      this.data = this.http.post(url, postData);
      this.data.subscribe((data) => {
        console.log(data);
        this.navCtrl.push(PublicacionPage, { valor: id_publicacion });

      }), err => {
        console.log("Oops!");

      }
    }else{
      this.navCtrl.push(PublicacionPage, { valor: id_publicacion });
    }
  }

  irFiltro() {
    //this.navCtrl.setRoot(FiltroPage);
    this.navCtrl.push(FiltroPage);
  }


}
