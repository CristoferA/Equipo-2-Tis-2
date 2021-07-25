import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublicacionPage } from '../publicacion/publicacion';
import { FiltroPage } from '../filtro/filtro';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html'
})
export class BusquedaPage {

  publicacionesBus:any;
  id_publicacion:any;

  nombreR = this.navParams.get('nombreB');
  regionR = this.navParams.get('regionB');
  comunaR = this.navParams.get('comunaB');
  tipoPR = this.navParams.get('tipoPB');
  tipoTR = this.navParams.get('tipoTB');
  //comunaB = this.navParams.get('valor3');

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    let postData = new FormData(); 
    console.log(this.nombreR);
  
    postData.append('nombre_publicacion', this.nombreR);
    postData.append("region_publicacion", this.regionR);
    postData.append("comuna_publicacion", this.comunaR);
    postData.append("tipo_publicacion", this.tipoPR);
    postData.append("tipo_turismo", this.tipoTR);
    
    this.http.post('http://appdeturismotis2.000webhostapp.com/apiRest/public/buscar', postData)
    .map(response => response.json())
    .subscribe(data =>
      {
        if (data === "No existen publicaciones en la BBDD con este ID."){
          console.log("No existen publicaciones en la BBDD con este ID.");
          
        } 
        else {
          this.publicacionesBus = data;
          console.log(data);
        }        

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