import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { a } from '@angular/core/src/render3';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data: Observable<any>;
  datos: FormGroup;
  id_usuario: any;
  nombre_usuario: any;
  contrasena: any;
  email_usuario: any;
  postData: any;
  token: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertController: AlertController, private http: Http, private toastCtrl: ToastController) {


    this.datos = formBuilder.group({
      id_usuario: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      nombre_usuario: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email_usuario: ['', [Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), Validators.maxLength(35), Validators.minLength(5)]],
      contrasena: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  irRegistro() {
    this.navCtrl.push(RegistroPage);
  }

  irHome() {
    this.navCtrl.push(HomePage);
  }



  async login() {
    let postData = new FormData();
    var f = this.datos.value;
    var url = 'http://localhost/apiRest/public/login';
    console.log(f);

    var usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario);

    if (usuario.id_usuario == f.id_usuario && usuario.contrasena == f.contrasena) {
      this.irHome();

    } else {

      //let body = JSON.stringify(postData);
      var respuesta;
      this.http.post(url, f)
        .map(Response => Response.json())
        .subscribe(data => {
          this.token = data;
          respuesta = this.token;
          if(respuesta.hasOwnProperty('error')){
            if(respuesta.error.text=="Bad request wrong username and password"){
              console.log(respuesta.error.text);
            }
          }
         
          else{
            localStorage.setItem('token', JSON.stringify(respuesta));
            this.irHome();
          }


        });

      /*const alert = await this.alertController.create({
        title: 'Datos incorrectos',
        message: 'Los datos que ingresaste no son correctos',
        buttons: ['Aceptar']

      });
      await alert.present();
      
      */
      /**/


      /*this.id_usuario=response;
      console.log(f.id_usuario);
      localStorage.setItem('auth_token', resp.token);

      localStorage.setItem('usuario', JSON.stringify(usuario));

*/


      return;
    }

  }


  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
