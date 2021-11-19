import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalidaRoutingModule } from './salida-routing.module';
import { SalidaComponent } from './salida.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MarcarSalidaComponent } from './components/marcar-salida/marcar-salida.component';
import { LimpiaSalidasComponent } from './components/limpia-salidas/limpia-salidas.component';


@NgModule( {
  declarations: [
    SalidaComponent,
    MarcarSalidaComponent,
    LimpiaSalidasComponent
  ],
  imports: [
    CommonModule,
    SalidaRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
} )
export class SalidaModule { }
