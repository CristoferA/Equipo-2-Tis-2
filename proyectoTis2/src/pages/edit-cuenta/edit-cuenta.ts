import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { CuentaPage } from '../cuenta/cuenta';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  datos:FormGroup;
  data:Observable<any>;
  id_usuario:any;
  nombre_usuario:any;
  email_usuario:any;
  cuenta: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public formBuilder: FormBuilder, public alertController: AlertController) {

    this.datos = formBuilder.group({
      id_usuario:  ['',[Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      nombre_usuario: ['',[Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email_usuario: ['',[Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), Validators.maxLength(35), Validators.minLength(5)]],
      
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCuentaPage');
  }

  cancelar(){
    this.navCtrl.setRoot(CuentaPage);
  }

  async guardar(){

    var f = this.datos.value;
    if(this.datos.invalid){
      const alert = await this.alertController.create({
        title: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']

      });
        await alert.present();
        return;
    }

    console.log(this.id_usuario);
    console.log(this.nombre_usuario);
    console.log(this.email_usuario);

    var usuario ={
      id_usuario: f.id_usuario,
      nombre_usuario: f.nombre_usuario,
      email_usuario: f.email_usuario
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));


    var url =  'http://localhost/apiRest/public/usuario/editar';
    this.data = this.http.put(url, usuario);


    this.data.subscribe((data) => {
      console.log(data);
      this.navCtrl.pop();

    }), err => {
      console.log("Oops!");
    }

}
}
