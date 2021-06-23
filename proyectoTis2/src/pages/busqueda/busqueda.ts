import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PublicacionPage } from '../publicacion/publicacion';
import { FiltroPage } from '../filtro/filtro';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html'
})
export class BusquedaPage {

  publicacionesDes:any;
  id_publicacion:any;

  constructor(public navCtrl: NavController, public http: Http) {

    this.http.get('http://localhost/apiRest/public/publicacion')
    .map(response => response.json())
    .subscribe(data =>
      {
        this.publicacionesDes = data;
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

  irFiltro(){
    this.navCtrl.push(FiltroPage);
  }
}
