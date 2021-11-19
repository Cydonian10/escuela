import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalidaComponent } from './salida.component';

const routes: Routes = [
  {
    path: "salida",
    component: SalidaComponent

  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class SalidaRoutingModule { }
