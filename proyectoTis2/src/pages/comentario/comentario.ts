import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CrearComentarioPage } from '../crear-comentario/crear-comentario';
/**
 * Generated class for the ComentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentario',
  templateUrl: 'comentario.html',
})
export class ComentarioPage {

  publicacion:any;
  comentario:any;
  id_publicacion = this.navParams.get('valor');
  data_pub:Observable<any>;
  data_com:Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.http.get('http://localhost/apiRest/public/publicacion/'+this.id_publicacion)
    .map(response => response.json())
    .subscribe(data_pub =>
      {
        this.publicacion = data_pub;

        console.log(data_pub);
      },
      err => {
        console.log("Oops!");
      }
    );

    this.http.get('http://localhost/apiRest/public/comentario/' + this.id_publicacion)
    .map(response => response.json())
    .subscribe(data_com =>
      {
        this.comentario = data_com;

        console.log(data_com);
      },
      err => {
        console.log("Oops!");
      }
    );

  }

  ionViewDidLoad() {
    console.log('Ya cargó ComentarioPage');
  }

  irCrearComentario(id_publicacion){
    this.navCtrl.push(CrearComentarioPage, {valor: id_publicacion});
  }

}
