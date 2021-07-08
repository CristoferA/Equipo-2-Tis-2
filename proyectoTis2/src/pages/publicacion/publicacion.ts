import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ReviewPage } from '../review/review';
import { ComentarioPage } from '../comentario/comentario';
import { PublicacionesOferentePage } from '../publicaciones-oferente/publicaciones-oferente';


@IonicPage()
@Component({
  selector: 'page-publicacion',
  templateUrl: 'publicacion.html',
})
export class PublicacionPage {

  publicacion:any;
  id_publicacion = this.navParams.get('valor');
  data:Observable<any>;
  id_review:any;
  oferente:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.http.get('http://localhost/apiRest/public/publicacion_detallada/'+this.id_publicacion)
    .map(response => response.json())
    .subscribe(data =>
      {
        this.publicacion = data;

        console.log(data);
      },
      err => {
        console.log("Oops!");
      }
    );

  }

  ionViewDidLoad() {
    console.log('Ya cargó PublicacionPage');
  }

  irReview(id_publicacion){
    this.navCtrl.push(ReviewPage, {valor: id_publicacion});
  }

  irComentario(id_publicacion){
    this.navCtrl.push(ComentarioPage, {valor: id_publicacion});
  }

  verPubUsuario(oferente){
    this.navCtrl.push(PublicacionesOferentePage, {valor: oferente});
    console.log(oferente);

  }

  irPublicacionesGuardadas(){
    let postData = new FormData();
    
    if('respuesta' in localStorage){
    var respuesta = JSON.parse(localStorage.getItem('respuesta'));
    var id_usuario = respuesta.data.id_usuario;
    console.log(id_usuario);  

    var url =  'http://localhost/apiRest/public/guardar_publicacion/new';
    
    postData.append('id_usuario', id_usuario);
    postData.append('id_publicacion', this.id_publicacion);
    this.data = this.http.post(url, postData);
    this.data.subscribe((data) => {
      console.log(data);
      this.navCtrl.pop();

    }), err => {
      console.log("Oops!");
    }
  }

  }


}
