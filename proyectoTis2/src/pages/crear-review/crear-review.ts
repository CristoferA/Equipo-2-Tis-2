import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

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

  publicacion:any;
  review:any;
  id_publicacion = this.navParams.get('valor');
  data_pub:Observable<any>;
  data_rev:Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {

    this.http.get('http://localhost/apiRest/public/publicacion/' + this.id_publicacion)
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
    console.log('Ya cargó CrearReviewPage');
  }

  mensajeToast() {
    const toast = this.toastCtrl.create({
      message: 'Reseña enviada correctamente.',
      duration: 3000
    });
    toast.present();
  }

  crearReview(){
    var url = 'http://localhost/apiRest/public/review/new';
    let postData = new FormData();

    console.log("El id_publicacion es: " + this.id_publicacion);
    console.log("La reseña es: " + this.review);

    postData.append('id_publicacion', this.id_publicacion);
    postData.append('review', this.review);

    this.data_rev = this.http.post(url, postData);

    this.data_rev.subscribe((data_rev) => {
      console.log(data_rev);

      this.mensajeToast();

      //this.navCtrl.pop();
    })
  }

}
