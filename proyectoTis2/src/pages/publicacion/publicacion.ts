import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ReviewPage } from '../review/review';
import { ComentarioPage } from '../comentario/comentario';
import { PublicacionesOferentePage } from '../publicaciones-oferente/publicaciones-oferente';
import { MapaPage } from '../mapa/mapa';
import { EtiquetaPublicacionPage } from '../etiqueta-publicacion/etiqueta-publicacion';
import { ToastController } from 'ionic-angular';


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
  etiqueta: any;
  similarPub : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private toastCtrl:ToastController) {

    this.http.get('http://localhost/apiRest/public/publicacion_detallada/'+this.id_publicacion)
    .map(response => response.json())
    .subscribe(data =>
      {
        this.publicacion = data;
        this.agregarVisita();

        console.log(data);
      },
      err => {
        console.log("Oops!");
      }
    );

    this.http.get('http://localhost/apiRest/public/etiqueta/'+this.id_publicacion)
    .map(response => response.json())
    .subscribe(datas=>
      {
        this.etiqueta = datas;
        console.log(datas);
      },
      err => {
        console.log("Oops!");
      });


      this.http.get('http://localhost/apiRest/public//publicacion_similar/'+this.id_publicacion)
      .map(response => response.json())
      .subscribe(data => {

        this.similarPub = data;

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
  verPubEtiqueta(etiqueta){
    this.navCtrl.push(EtiquetaPublicacionPage, {valor: etiqueta});
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
  }else{

    this.presentToast("Para guardar debes iniciar sesion");
  }

  }

  verPub(id_publicacion){
    this.navCtrl.push(PublicacionPage, { valor: id_publicacion });
  }

  presentToast(msg: string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
  agregarVisita(){
    console.log(this.id_publicacion);

    this.http.get('http://localhost/apiRest/public/publicacion/visita/'+this.id_publicacion)
    .map(response => response.json())
    .subscribe(data =>
      {
        if (data === "No existe publicacion en la BBDD con este ID."){
          console.log("No existe publicacion en la BBDD con este ID.");
          
        } 
        else {
          console.log(data);
        }        

      },
      err => {
        console.log("Oops!");
      }
    );
  }

  irMapa(){
    this.navCtrl.push(MapaPage);
  }


}

