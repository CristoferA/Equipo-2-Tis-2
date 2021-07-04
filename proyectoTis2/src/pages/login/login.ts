import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertController: AlertController, private http: Http,private toastCtrl:ToastController) {


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
    var f = this.datos.value;

    console.log(f);
    
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario);

    if (usuario.id_usuario == f.id_usuario && usuario.contrasena == f.contrasena) {


      this.irHome();

    }else {

      var url = 'http://localhost/apiRest/public/login';
      this.data = this.http.post(url, f);

      this.data.subscribe((data) => {
        console.log(data);
  
        this.presentToast("Logeado correctamente");
        this.irHome();
  
      }), err => {
        console.log("Oops!");
      }
  

      const alert = await this.alertController.create({
        title: 'Datos incorrectos',
        message: 'Los datos que ingresaste no son correctos',
        buttons: ['Aceptar']

      });
      await alert.present();
      return;
    }

  }



  presentToast(msg: string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
