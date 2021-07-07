import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

/**
 * Generated class for the CrearComentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-comentario',
  templateUrl: 'crear-comentario.html',
})
export class CrearComentarioPage {

  publicacion:any;
  id_publicacion = this.navParams.get('valor');
  data_pub:Observable<any>;
  data_comment:Observable<any>;
  comentario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {

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

  }

  ionViewDidLoad() {
    console.log('Ya cargó CrearComentarioPage');
  }

  mensajeToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  crearComentario() {
    var url = 'http://localhost/apiRest/public/comentario/new';
    let postData = new FormData();

    console.log("El id_publicacion es: " + this.id_publicacion);
    console.log("El comentario es: " + this.comentario);

    postData.append('id_publicacion', this.id_publicacion);
    postData.append('comentario', this.comentario);

    this.data_comment = this.http.post(url, postData);

    this.data_comment.subscribe((data_comment) => {
      console.log(data_comment);

      this.mensajeToast('Comentario publicado correctamente.');
      this.navCtrl.setRoot(HomePage);
    })
  }
}
