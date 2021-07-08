import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PublicacionPage } from '../publicacion/publicacion';
import { FiltroPage } from '../filtro/filtro';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  publicacionesDes:any;
  id_publicacion:any;
  estado: any;


  constructor(public navCtrl: NavController, public http: Http) {
    var a;
   
    this.http.get('http://appdeturismotis2.000webhostapp.com/apiRest/public/publicacion')
    .map(response => response.json())
    .subscribe(data =>
      {
        
        this.publicacionesDes = data;
        
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
    //this.navCtrl.setRoot(FiltroPage);
    this.navCtrl.push(FiltroPage);
  }
}
