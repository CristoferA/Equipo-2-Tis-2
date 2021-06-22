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
  nombre:any;
  descripcion:any;
  precio:any;
  ubicacion:any;
  telefono:any;
  correo:any;
  rrss:any;
  likes:any;
  tipo_publicacion:any;
  tipo_turismo:any;
  estado:any; //"pendiente" o "aprobado"
  moderador:any;
  region:any;
  comuna:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: Http,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPublicacionPage');
  }

  mensajeToast() {
    const toast = this.toastCtrl.create({
      message: 'Publicación subida correctamente y en espera de aprobación.',
      duration: 3000
    });
    toast.present();
  }

  crearPublicacion(){
    var url = 'http://localhost/apiRest/public/publicacion/new';
    let postData = new FormData();

    console.log("nombre_publicacion es: " + this.nombre);
    console.log("descripcion es: " + this.descripcion);
    console.log("precio es: " + this.precio);
    console.log("ubicacion es: " + this.ubicacion);
    console.log("telefono es: " + this.telefono);
    console.log("email es: " + this.correo);
    console.log("redes_sociales es: " + this.rrss);
    console.log("likes es: " + this.likes);
    console.log("tipo_publicacion es: " + this.tipo_publicacion);
    console.log("tipo_turismo es: "+ this.tipo_turismo);
    console.log("id_moderador es: "+ this.moderador);
    console.log("region es: " + this.region);
    console.log("comuna es: " + this.comuna);

    postData.append('nombre_publicacion', this.nombre);
    postData.append('descripcion_publicacion', this.descripcion);
    postData.append('valor_publicacion', this.precio);
    postData.append('direccion', this.ubicacion);
    postData.append('telefono_contacto', this.telefono);
    postData.append('email_contacto', this.correo);
    postData.append('redes_sociales', this.rrss);
    postData.append('calificacion_publicacion', '0'); //no sé cómo dejar lo de los likes xd
    postData.append('tipo_publicacion', this.tipo_publicacion);
    postData.append('tipo_turismo', this.tipo_turismo);
    postData.append('estado','pendiente');
    postData.append('id_moderador', this.moderador);
    postData.append("region_publicacion", this.region);
    postData.append("comuna_publicacion", this.comuna);
    this.data = this.http.post(url, postData);

    this.data.subscribe((data) => {
      console.log(data);

      this.mensajeToast();

      //this.navCtrl.pop();
    })

  }  

}
