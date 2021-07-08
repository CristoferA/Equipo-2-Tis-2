import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})

export class RegistroPage {


  //IMPORTANTE
  datos:FormGroup;
  data:Observable<any>;
  id_usuario:any;
  nombre_usuario:any;
  contrasena:any;
  email_usuario:any;
  tipo:any;

  
  
  //añadir toast aqui y en la funcion
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public formBuilder: FormBuilder,private toastCtrl:ToastController, public alertController: AlertController) {
      
  

    //ionic 3 angular 4
    
    this.datos = formBuilder.group({
      id_usuario:  ['',[Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      nombre_usuario: ['',[Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email_usuario: ['',[Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), Validators.maxLength(35), Validators.minLength(5)]],
      contrasena: ['',[Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  irLogin(){
    this.navCtrl.pop();
  }


  async register(){

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
    console.log(this.contrasena);
    console.log(this.email_usuario);

    var usuario ={
      id_usuario: f.id_usuario,
      nombre_usuario: f.nombre_usuario,
      contrasena: f.contrasena,
      email_usuario: f.email_usuario
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    var url =  'http://appdeturismotis2.000webhostapp.com/apiRest/public/signup';
    this.data = this.http.post(url, usuario);


   /* 
    let postData= new FormData();
  


    postData.append('id_usuario', this.id_usuario);
    postData.append('nombre_usuario', this.nombre_usuario);
    postData.append('contrasena', this.contrasena);
    postData.append('email_usuario', this.email_usuario);
    
 
    */
    


    this.data.subscribe((data) => {
      console.log(data);

      this.presentToast("Registro realizado correctamente");
      this.navCtrl.pop();

    }), err => {
      console.log("Oops!");
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