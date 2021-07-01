import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BusquedaPage } from '../busqueda/busqueda';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the FiltroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtro',
  templateUrl: 'filtro.html',
})
export class FiltroPage {

  regiones:any;
  comunas:any;
  id_publicacion:any;
  regionS:any;

  datos: FormGroup;
  data: Observable<any>;
  
  nombreF: any;
  regionF: any;
  comunaF: any;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public toastCtrl: ToastController) {

    this.http.get('https://apis.digital.gob.cl/dpa/regiones')
    .map(response => response.json())
    .subscribe(data =>
      {
        this.regiones = data;
        console.log(data);
      },
      err => {
        console.log("Oops!");
      }
    );
   
  }

  onOptionsSelected(value:string){
    console.log("Region seleccionada tiene codigo " + value);

    this.http.get('https://apis.digital.gob.cl/dpa/regiones/'+value+'/comunas')
    .map(response => response.json())
    .subscribe(data2 =>
      {
        this.comunas = data2;
        console.log(data2);
      },
      err => {
        console.log("Oops!");
      }
    );
  }

  irBusqueda(){
    this.navCtrl.push(BusquedaPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltroPage');
  }

  mensajeToast() {
    const toast = this.toastCtrl.create({
      message: 'Publicación subida correctamente y en espera de aprobación.',
      duration: 3000
    });
    toast.present();
  }
  
  crearPublicacion() {
    var url = 'http://localhost/apiRest/public/publicacion/buscar';
    let postData = new FormData();
  
    console.log("nombre_publicacion es: " + this.nombreF);
    console.log("region es: " + this.regionF);
    console.log("comuna es: " + this.comunaF);
  
    postData.append('nombre_publicacion', this.nombreF);
    postData.append("region_publicacion", this.regionF);
    postData.append("comuna_publicacion", this.comunaF);
    this.data = this.http.post(url, postData);
  
    this.data.subscribe((data) => {
      console.log(data);
  
      this.mensajeToast();
  
      //this.navCtrl.pop();
    })
  
  }

}


