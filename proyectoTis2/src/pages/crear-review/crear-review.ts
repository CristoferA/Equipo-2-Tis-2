import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
/**
 * Generated class for the CrearReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-review',
  templateUrl: 'crear-review.html',
})
export class CrearReviewPage {

  publicacion: any;
  review: any;
  id_publicacion = this.navParams.get('valor');
  data_pub: Observable<any>;
  data_rev: Observable<any>;
  data_pro1: Observable<any>;
  data_pro2: Observable<any>;
  data_pro3: Observable<any>;
  data_contra1: Observable<any>;
  data_contra2: Observable<any>;
  data_contra3: Observable<any>;
  usuario: any;
  pro_1:any;
  pro_2:any;
  pro_3:any;
  contra_1:any;
  contra_2:any;
  contra_3:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {

    this.http.get('http://localhost/apiRest/public/publicacion/' + this.id_publicacion)
      .map(response => response.json())
      .subscribe(data_pub => {
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
    console.log('Ya cargó CrearReviewPage');
  }

  mensajeToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  crearReview() {
    var url_review = 'http://localhost/apiRest/public/review/new';
    var url_pro = 'http://localhost/apiRest/public/pro/new';
    var url_contra = 'http://localhost/apiRest/public/contra/new';
    let postData = new FormData();

    console.log("El id_publicacion es: " + this.id_publicacion);
    console.log("La reseña es: " + this.review);
    console.log("El id_usuario es: " + this.usuario);
    console.log("El estado es: " + "pendiente");
    console.log("El pro 1 es: " + this.pro_1);
    console.log("El pro 2 es: " + this.pro_2);
    console.log("El pro 3 es: " + this.pro_3);
    console.log("El contra 1 es: " + this.contra_1);
    console.log("El contra 2 es: " + this.contra_2);
    console.log("El contra 3 es: " + this.contra_3);

    postData.append('id_publicacion', this.id_publicacion);
    postData.append('review', this.review);
    postData.append('id_usuario', this.usuario);
    postData.append('estado', "pendiente");
    this.http.post(url_review, postData);

    postData.append('texto_pro',this.pro_1);
    this.http.post(url_pro, postData);
    postData.append('texto_pro',this.pro_2);
    this.http.post(url_pro, postData);
    postData.append('texto_pro',this.pro_3);
    this.http.post(url_pro, postData);

    postData.append('texto_contra',this.contra_1);
    this.http.post(url_contra, postData);
    postData.append('texto_contra',this.contra_2);
    this.http.post(url_contra, postData);
    postData.append('texto_contra',this.contra_3);
    this.http.post(url_contra, postData);

    this.mensajeToast('Reseña enviada correctamente y pendiente de aprobación.');
    this.navCtrl.setRoot(HomePage);
  }

  irLogeo() {
    this.navCtrl.setRoot(LoginPage);
  }
}
