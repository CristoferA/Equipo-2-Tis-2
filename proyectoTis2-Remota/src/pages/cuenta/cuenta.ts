import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisPublicacionesPage } from '../mis-publicaciones/mis-publicaciones';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { MisPublicacionesGuardadasPage } from '../mis-publicaciones-guardadas/mis-publicaciones-guardadas';

@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})

export class CuentaPage {


  data:Observable<any>;
  id_usuario:any;
  nombre_usuario:any;
  email_usuario:any;
  cuenta: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {


    if('respuesta' in localStorage){
    var respuesta = JSON.parse(localStorage.getItem('respuesta'));
    var id_usuario = respuesta.data.id_usuario;
    console.log(id_usuario);  
 
    this.http.get('http://appdeturismotis2.000webhostapp.com/apiRest/public/usuario/'+id_usuario)
    .map(response => response.json())
    .subscribe(data => {
      this.cuenta = data;
      console.log(data);  
    },
    err => {
      console.log("Oops!");
    }
  );
   
  }else{
    this.irLogin();
  }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');
  }

  irMisPublicaciones(){
    this.navCtrl.push(MisPublicacionesPage);
  }

  irHome() {
    this.navCtrl.setRoot(HomePage);
  }

  irLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  cerrar(){
      localStorage.clear();
      this.irHome();
  }

  PublicacionesGuardadas(){
    this.navCtrl.push(MisPublicacionesGuardadasPage);
  }

}