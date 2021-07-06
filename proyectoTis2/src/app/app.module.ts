import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PublicacionPage } from '../pages/publicacion/publicacion';
import { FiltroPage } from '../pages/filtro/filtro';
import { BusquedaPage } from '../pages/busqueda/busqueda';
import { LoginPage } from '../pages/login/login';
import { CrearPublicacionPage } from '../pages/crear-publicacion/crear-publicacion';
import { RegistroPage } from '../pages/registro/registro';
import { CuentaPage } from '../pages/cuenta/cuenta';
import { MisPublicacionesPage } from '../pages/mis-publicaciones/mis-publicaciones';
import { ReviewPage } from '../pages/review/review';
import { CrearReviewPage } from '../pages/crear-review/crear-review';
import { CrearPublicacionCheckPage } from '../pages/crear-publicacion-check/crear-publicacion-check';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OferenteCheckPage } from '../pages/oferente-check/oferente-check';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PublicacionPage,
    FiltroPage,
    BusquedaPage,
    LoginPage,
    CrearPublicacionPage,
    RegistroPage,
    CuentaPage,
    MisPublicacionesPage,
    ReviewPage,
    CrearPublicacionPage,
    CrearReviewPage,
    CrearPublicacionCheckPage,
    OferenteCheckPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PublicacionPage,
    FiltroPage,
    BusquedaPage,
    LoginPage,
    CrearPublicacionPage,
    RegistroPage,
    CuentaPage,
    MisPublicacionesPage,
    ReviewPage,
    CrearReviewPage,
    CrearPublicacionCheckPage,
    OferenteCheckPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  
}
