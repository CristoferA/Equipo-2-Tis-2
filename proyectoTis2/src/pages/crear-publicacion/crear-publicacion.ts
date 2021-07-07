import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
/**
 * Generated class for the CrearPublicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-publicacion',
  templateUrl: 'crear-publicacion.html',
})
export class CrearPublicacionPage {

  datos: FormGroup;
  data: Observable<any>;
  nombre: any;
  descripcion: any;
  precio: any;
  ubicacion: any;
  telefono: any;
  correo: any;
  rrss: any;
  likes: any;
  tipo_publicacion: any;
  tipo_turismo: any;
  estado: any; //"pendiente" o "aprobado"
  moderador: any;
  region: any;
  comuna: any;
  //xdd
  //xd
  regiones: any;
  comunas: any;
  regionS: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public toastCtrl: ToastController) {
    this.http.get('https://apis.digital.gob.cl/dpa/regiones')
      .map(response => response.json())
      .subscribe(data3 => {
        this.regiones = data3;
        console.log(data3);
      },
        err => {
          console.log("Oops!");
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPublicacionPage');
  }

  mensajeToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  crearPublicacion() {
    var url = 'http://localhost/apiRest/public/publicacion_detallada/new';
    let postData = new FormData();
    
    console.log("El nombre_publicacion es: " + this.nombre);
    console.log("La descripcion es: " + this.descripcion);
    console.log("El precio es: " + this.precio);
    console.log("La ubicacion es: " + this.ubicacion);
    console.log("El telefono es: " + this.telefono);
    console.log("El email es: " + this.correo);
    console.log("Las redes_sociales son: " + this.rrss);
    console.log("Los likes son: " + this.likes);
    console.log("El tipo_publicacion es: " + this.tipo_publicacion);
    console.log("El tipo_turismo es: " + this.tipo_turismo);
    console.log("El id_moderador es: " + this.moderador);
    console.log("El id de la region es: " + this.region + ". Y el nombre es: " + document.getElementById("regionID").innerText);
    console.log("El id de la comuna es: " + this.comuna + ". Y el nombre es: " + document.getElementById("comunaID").innerText);


    if('respuesta' in localStorage){        //si esta logeado
      var token=JSON.parse(localStorage.getItem('respuesta'));
      console.log(token);
      
      if(token.hasOwnProperty('data')){   //solo si hay datos entra
        var id_oferente = token.data.id_usuario; 
        postData.append('nombre_publicacion', this.nombre);
        postData.append('descripcion_publicacion', this.descripcion);
        postData.append('valor_publicacion', this.precio);
        postData.append('direccion', this.ubicacion);
        postData.append('telefono_contacto', this.telefono);
        postData.append('email_contacto', this.correo);
        postData.append('redes_sociales', this.rrss);
        postData.append('calificacion_publicacion', '0'); //no sé cómo dejar lo de los likes xd
        postData.append('tipo_publicacion', this.tipo_publicacion); //'producto','servicio','infraestructura'
        postData.append('tipo_turismo', this.tipo_turismo); //'negocios','urbano','natural','gastronomico','aventura','ecologico','cultural','lujo','diversion','religioso','espacial'
        postData.append('estado', 'pendiente');
        postData.append('id_moderador', '1');
        postData.append("region_publicacion", document.getElementById("regionID").innerText);
        postData.append("comuna_publicacion", document.getElementById("comunaID").innerText);
        postData.append('id_oferente',id_oferente);
        this.data = this.http.post(url, postData);

        this.data.subscribe((data) => {
          console.log(data);

          this.mensajeToast('Publicación subida correctamente y en espera de aprobación.');
          this.navCtrl.setRoot(HomePage);
          //this.navCtrl.pop();
        })
      }
    }

    

    

  }

  onOptionsSelected(value: string) {
    console.log("Region seleccionada tiene codigo " + value);

    this.http.get('https://apis.digital.gob.cl/dpa/regiones/' + value + '/comunas')
      .map(response => response.json())
      .subscribe(data2 => {
        this.comunas = data2;
        console.log(data2);
      },
        err => {
          console.log("Oops!");
        }
      );
  }

}
