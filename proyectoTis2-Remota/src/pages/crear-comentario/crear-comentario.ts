import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

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
  comentario:any;
  usuario:any;
  likes:any;
  id_publicacion = this.navParams.get('valor');
  data_pub:Observable<any>;
  data_comment:Observable<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {
    
    this.http.get('http://appdeturismotis2.000webhostapp.com/apiRest/public/publicacion/'+this.id_publicacion)
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

    //localStorage.clear(); //pa probar cuando no se ha logeado
    if ('respuesta' in localStorage) {
      var token = JSON.parse(localStorage.getItem('respuesta'));
      console.log(token);

      if (token.hasOwnProperty('data')) {
        console.log("El id del usuario es: " + token.data.id_usuario);
        console.log("ENTRÓ AL IF.");
        console.log("Llevar a crearReview"); //DEJARLO PASAR NOMAS
        this.usuario = token.data.id_usuario;
      }
    } else {
      console.log("NO ENTRÓ AL IF. ENTRÓ AL ELSE");
      console.log("No estás logeado");
      this.mensajeToast('Debes iniciar sesión para poder hacer una reseña.')
      this.irLogeo();
    }

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
    var url = 'http://appdeturismotis2.000webhostapp.com/apiRest/public/comentario/new';
    let num = 0;
    var stringForm = num.toString();
    let postData = new FormData();

    console.log("El id_publicacion es: " + this.id_publicacion);
    console.log("El comentario es: " + this.comentario);
    console.log("El usuario es: " + this.usuario);
    console.log("this.likes es: " + stringForm);

    postData.append('id_publicacion', this.id_publicacion);
    postData.append('comentario', this.comentario);
    postData.append('id_usuario', this.usuario);
    postData.append('likes', stringForm);

    this.data_comment = this.http.post(url, postData);

    this.data_comment.subscribe((data_comment) => {
      console.log(data_comment);

      this.mensajeToast('Comentario publicado correctamente.');
      this.navCtrl.setRoot(HomePage);
    })
  }

  irLogeo() {
    this.navCtrl.setRoot(LoginPage);
  }

}
