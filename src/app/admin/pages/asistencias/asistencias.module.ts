import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciasRoutingModule } from './asistencias-routing.module';
import { AsistenciasComponent } from './asistencias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';


@NgModule( {
  declarations: [
    AsistenciasComponent
  ],
  imports: [
    CommonModule,
    AsistenciasRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
} )
export class AsistenciasModule { }
