import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { CuentaPage } from '../cuenta/cuenta';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the EditCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-cuenta',
  templateUrl: 'edit-cuenta.html',
})
export class EditCuentaPage {
  datos: FormGroup;
  data: Observable<any>;
  id_usuario: any;
  nombre_usuario: any;
  email_usuario: any;
  cuenta: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public formBuilder: FormBuilder, public alertController: AlertController) {
    var respuesta = JSON.parse(localStorage.getItem('respuesta'));
    var id_usuario = respuesta.data.id_usuario;
    console.log(id_usuario);


    //http://localhost/apiRest/public/usuario/
    //https://edein.cl/equipo2/apiRest/public/usuario/
    this.http.get('https://edein.cl/equipo2/apiRest/public/usuario/' + id_usuario)
      .map(response => response.json())
      .subscribe(data => {

        this.cuenta = data;
        console.log(data);

      },
        err => {
          console.log("Oops!");
        }
      );
    this.datos = formBuilder.group({
      id_usuario: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      nombre_usuario: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email_usuario: ['', [Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), Validators.maxLength(35), Validators.minLength(5)]],

    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCuentaPage');
  }

  cancelar() {
    this.navCtrl.setRoot(CuentaPage);
  }

  guardar() {

    if ('respuesta' in localStorage) {
      var respuesta = JSON.parse(localStorage.getItem('respuesta'));
      var id_usuario = respuesta.data.id_usuario;
      console.log(id_usuario);
      //http://localhost/apiRest/public/usuario/editar
      //https://edein.cl/equipo2/apiRest/public/usuario/editar
      var url = 'https://edein.cl/equipo2/apiRest/public/usuario/editar';
      let postData = new FormData();

      postData.append('id_usuario', this.id_usuario);
      postData.append('nombre_usuario', this.nombre_usuario);
      postData.append('email_usuario', this.email_usuario);


      this.http.post(url, postData)
        .map(response => response.json())
        .subscribe((data) => {
          console.log(data);
          this.navCtrl.pop();

        }), err => {
          console.log("Oops!");
        }

    }
  }
}
