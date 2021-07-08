import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { PublicacionPage } from '../publicacion/publicacion';

/**
 * Generated class for the MisPublicacionesGuardadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-publicaciones-guardadas',
  templateUrl: 'mis-publicaciones-guardadas.html',
})
export class MisPublicacionesGuardadasPage {
  
  data:Observable<any>;
  id_usuario:any;
  publicacionesGuardadas:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    
    
    var respuesta = JSON.parse(localStorage.getItem('respuesta'));
    var id_usuario = respuesta.data.id_usuario;
    console.log(id_usuario);  

    this.http.get('http://localhost/apiRest/public/publicaciones_guardadas/'+id_usuario)
    .map(response => response.json())
    .subscribe(data =>{
        this.publicacionesGuardadas = data;
        console.log(data);  
      },
      err => {
        console.log("Oops!");
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisPublicacionesGuardadasPage');
  }

  irPublicacion(id_publicacion){
    this.navCtrl.push(PublicacionPage, {valor: id_publicacion});
  }

}
