import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ReviewPage } from '../review/review';
import { ComentarioPage } from '../comentario/comentario';
import { MisPublicacionesPage } from '../mis-publicaciones/mis-publicaciones';


//import { createImportSpecifier } from 'typescript';
/**
 * Generated class for the EliminarPublicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eliminar-publicacion',
  templateUrl: 'eliminar-publicacion.html',
})
export class EliminarPublicacionPage {
  publicacion:any;
  id_publicacion = this.navParams.get('valor');
  data:Observable<any>;
  id_review:any;
  oferente:any;
  etiqueta: any;
  similarPub : any;

  direccionP : any;
  direccionS : any;  
  direccionPub: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('http://localhost/apiRest/public/publicacion_detallada/'+this.id_publicacion)
    .map(response => response.json())
    .subscribe(data =>
      {
        this.publicacion = data;
        //this.agregarVisita();

        console.log(data);
      },
      err => {
        console.log("Oops!");
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EliminarPublicacionPage');
  }
  irComentario(id_publicacion){
    this.navCtrl.push(ComentarioPage, {valor: id_publicacion});
  }
  irReview(id_publicacion){
    this.navCtrl.push(ReviewPage, {valor: id_publicacion});
  }
  eliminarPublicacion(){
    console.log("Holi");
    console.log(this.id_publicacion);
    var a = this.id_publicacion;
    this.http.delete('http://localhost/apiRest/public/publicacion/delete/'+a)
    .subscribe(data =>{
      console.log("ARDILLA");
      console.log(data);
      this.irMisPublicaciones();
    },
    err => {
      // Colocar toas con error
      console.log("Oops~~!");
    });
  }
  irMisPublicaciones(){
    this.navCtrl.setRoot(MisPublicacionesPage);
  }
}
