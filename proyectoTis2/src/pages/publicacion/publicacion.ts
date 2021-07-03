import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ReviewPage } from '../review/review';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.http.get('http://localhost/apiRest/public/publicacion/'+this.id_publicacion)
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

}
