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
        console.log(token.data.id_usuario);
        console.log("ENTRÓ AL IF.");
        console.log("Llevar a crearReview"); //DEJARLO PASAR NOMAS
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
    var url = 'http://localhost/apiRest/public/review/new';
    let postData = new FormData();

    console.log("El id_publicacion es: " + this.id_publicacion);
    console.log("La reseña es: " + this.review);

    postData.append('id_publicacion', this.id_publicacion);
    postData.append('review', this.review);

    this.data_rev = this.http.post(url, postData);

    this.data_rev.subscribe((data_rev) => {
      console.log(data_rev);

      this.mensajeToast('Reseña enviada correctamente.');
      this.navCtrl.setRoot(HomePage);
    })
  }

  irLogeo() {
    this.navCtrl.setRoot(LoginPage);
  }
}
