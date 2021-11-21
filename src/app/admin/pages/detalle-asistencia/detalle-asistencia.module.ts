import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableExporterModule } from 'mat-table-exporter';
import { DetalleAsistenciaComponent } from './detalle-asistencia.component';
import { DetalleAsistenciaRoutingModule } from './detalle-asistencia-routing.module';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule( {
  declarations: [
    DetalleAsistenciaComponent
  ],
  imports: [
    CommonModule,
    DetalleAsistenciaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableExporterModule
  ]
} )
export class DetalleAsistenciaModule { }
