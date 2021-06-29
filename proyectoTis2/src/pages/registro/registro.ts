import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public formBuilder: FormBuilder,private toastCtrl:ToastController) {
      
  

    //ionic 3 angular 4
    
    this.datos = formBuilder.group({
      id_usuario:  ['',[Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      nombre_usuario: ['',[Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email_usuario: ['',[Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), Validators.maxLength(35), Validators.minLength(5)]],
      contrasena: ['',[Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
      tipo: ['', Validators.required]
    });

    

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  irLogin(){
    this.navCtrl.pop();
  }


  register(){

    var url =  'http://localhost/apiRest/public/usuario/new';
    let postData= new FormData();

    postData.append('id_usuario', this.id_usuario);
    postData.append('nombre_usuario', this.nombre_usuario);
    postData.append('contrasena', this.contrasena);
    postData.append('email_usuario', this.email_usuario);
    this.data = this.http.post(url, postData);
    
    
    this.data.subscribe((data) => {

      this.presentToast("Registro realizado correctamente");
      
      this.navCtrl.pop();

    })

  
  }


  presentToast(msg: string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

 

  
}