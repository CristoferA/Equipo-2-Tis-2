import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PublicacionPage } from '../publicacion/publicacion';
import { FiltroPage } from '../filtro/filtro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  irPublicacion(){
    this.navCtrl.push(PublicacionPage);
  }

  irFiltro(){
    this.navCtrl.push(FiltroPage);
  }
}
