import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { PublicacionPage } from '../publicacion/publicacion';
import { HomePage } from '../home/home';
/**
 * Generated class for the MisPublicacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-publicaciones',
  templateUrl: 'mis-publicaciones.html',
})
export class MisPublicacionesPage {
  publicaciones: any;
  usuario: any;
  //oferente = this.navParams.get('valor');
  data: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {


    if ('respuesta' in localStorage) {
      var token = JSON.parse(localStorage.getItem('respuesta'));
      console.log(token);
      if (token.hasOwnProperty('data')) {
        console.log(token.data.id_usuario);
        var a = token.data.id_usuario;
        this.http.get("http://localhost/apiRest/public/oferente/" + a)   //OFERENTES
          .map(Response => Response.json())
          .subscribe(data => {
            if (data === "No existen usuarios en la BBDD con este ID.") { // TE LLEVA A OFERENTE-CHECK   logeado no oferente
              console.log("LLEGUE ACA Y ENTRE AL IF");
              console.log("NO ERES OFERENTE");
              this.irHome();

            } else {                                      // LLEVA AL FORMULARIO SI SE CUMPLE TODO
              console.log("ENTRE AL ELSE");
              console.log("LLEVAR A CREAR PUBLICACION");
              this.verPublicaciones(a);
            }
          });
      }


    } else {
      //Colocar Toast que no ingreso 
      this.irLogin();
    }
  }

  verPublicaciones(a) {
    //Aca se saca el id_de usuario dependiendo si ta logeado
    //desde el Local Storage
    //Tiene que ser oferente si no lo lleva al login
    this.http.get('http://localhost/apiRest/public/mis_publicaciones/' + a)
      .map(response => response.json())
      .subscribe(data => {
        this.publicaciones = data;

        console.log(data);
      },
        err => {
          console.log("Oops!");
        }
      );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MisPublicacionesPage');
  }

  irHome(){
    //colocar Un toast que diga que no es oferente
    this.navCtrl.setRoot(HomePage);
  }
  irLogin() {
    //colocar Un toast que diga que se logee
    this.navCtrl.setRoot(LoginPage);
  }
  irPublicacion(id_publicacion) {
    this.navCtrl.push(PublicacionPage, { valor: id_publicacion });
  }
}
