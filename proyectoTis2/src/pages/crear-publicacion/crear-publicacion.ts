import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

/**
 * Generated class for the CrearPublicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-publicacion',
  templateUrl: 'crear-publicacion.html',
})
export class CrearPublicacionPage {

  datos:FormGroup;
  data:Observable<any>;
  name:any;
  description:any;
  price:any;
  location:any;
  phone:any;
  email:any;
  rrss:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: Http,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPublicacionPage');
  }

  crearPublicacion(){
    var url = 'http://localhost/apiRest/public/publicacion/new';
    let postData = new FormData();

    console.log("nombre_publicacion es: " + this.name);
    console.log("descripcion es: " + this.description);
    console.log("precio es: " + this.price);
    console.log("ubicacion es: " + this.location);
    console.log("telefono es: " + this.phone);
    console.log("email es: " + this.email);
    console.log("redes_sociales es: " + this.rrss);
    
    postData.append('nombre_publicacion', this.name);
    postData.append('descripcion', this.description);
    postData.append('precio', this.price);
    postData.append('ubicacion', this.location);
    postData.append('telefono', this.phone);
    postData.append('email', this.email);
    postData.append('redes_sociales', this.rrss);
    this.data = this.http.post(url, postData);

    this.data.subscribe((data) => {
      console.log(data);

      //this.presentToast("Publicación subida correctamente y en espera de aprobación.");

      this.navCtrl.pop();
    })

  }  

}
