import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';



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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
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
      
      this.navCtrl.pop();

    })
    
  }
}