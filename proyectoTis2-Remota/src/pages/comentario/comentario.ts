import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  publicacion: any;
  comentario: any;
  id_publicacion = this.navParams.get('valor');
  id_comentario = this.navParams.get('valor');;
  data_pub: Observable<any>;
  data_com: Observable<any>;
  data_likes: Observable<any>;
  data_dislike: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {
    //http://localhost/apiRest/public/publicacion/
    ////https://edein.cl/equipo2/apiRest/public/publicacion/
    this.http.get('https://edein.cl/equipo2/apiRest/public/publicacion/' + this.id_publicacion)
      .map(response => response.json())
      .subscribe(data_pub => {
        this.publicacion = data_pub;

        console.log(data_pub);
      },
        err => {
          console.log("Oops!");
        }
      );

      //http://localhost/apiRest/public/comentario/
      //https://edein.cl/equipo2/apiRest/public/comentario/
    this.http.get('https://edein.cl/equipo2/apiRest/public/comentario/' + this.id_publicacion)
      .map(response => response.json())
      .subscribe(data_com => {
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

  irCrearComentario(id_publicacion) {
    this.navCtrl.push(CrearComentarioPage, { valor: id_publicacion });
  }

  mensajeToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  darLike(id_comentario) {
    console.log('Entró a darLike()');
    if ('respuesta' in localStorage) {
      var respuesta = JSON.parse(localStorage.getItem('respuesta'));
      var id_usuario = respuesta.data.id_usuario;
      console.log('El usuario logeado es: ' + id_usuario);

      let le_dio_like:boolean = false;
      if (!le_dio_like) {
        //http://localhost/apiRest/public/comentario/like
        //https://edein.cl/equipo2/apiRest/public/comentario/like

        var url = 'https://edein.cl/equipo2/apiRest/public/comentario/like';
        let postData = new FormData();

        console.log("id_comentario es: " + id_comentario);

        postData.append('id_comentario', id_comentario);

        this.data_likes = this.http.post(url, postData);
        this.data_likes.subscribe((data_likes) => {
          this.mensajeToast('Te gusta este comentario.');
          console.log(data_likes);
          le_dio_like = true;
        },
          err => {
            console.log("OopsLikes!");
          })
      } else {
        this.mensajeToast('Ya le diste "me gusta" a este comentario.');
      }
    } else {
      this.mensajeToast('Debe iniciar sesión para darle "me gusta" a un comentario.');
    }
  }

  darDislike(id_comentario) {
    console.log('Entró a darDislike()');
    if ('respuesta' in localStorage) {
      var respuesta = JSON.parse(localStorage.getItem('respuesta'));
      var id_usuario = respuesta.data.id_usuario;
      console.log('El usuario logeado es: ' + id_usuario);

      let le_dio_like:boolean = false;
      if (!le_dio_like) {
        //http://localhost/apiRest/public/comentario/dislike
        //https://edein.cl/equipo2/apiRest/public/comentario/dislike
        var url = 'https://edein.cl/equipo2/apiRest/public/comentario/dislike';
        let postData = new FormData();

        console.log("id_comentario es: " + id_comentario);

        postData.append('id_comentario', id_comentario);

        this.data_dislike = this.http.post(url, postData);
        this.data_dislike.subscribe((data_dislike) => {
          this.mensajeToast('No te gusta este comentario.');
          console.log(data_dislike);
          le_dio_like = true;
        },
          err => {
            console.log("OopsLikes!");
          })
      } else {
        this.mensajeToast('Ya le diste "me gusta" a este comentario.');
      }
    } else {
      this.mensajeToast('Debe iniciar sesión para darle "me gusta" a un comentario.');
    }
  }
}
