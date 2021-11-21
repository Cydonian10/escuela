import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleAsistenciaComponent } from './detalle-asistencia.component';

const routes: Routes = [
  {
    path: ":id",
    component: DetalleAsistenciaComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class DetalleAsistenciaRoutingModule { }
