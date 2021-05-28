import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarCuentaPage } from './editar-cuenta';

@NgModule({
  declarations: [
    EditarCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarCuentaPage),
  ],
})
export class EditarCuentaPageModule {}
