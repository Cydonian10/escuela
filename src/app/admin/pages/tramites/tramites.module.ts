import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesRoutingModule } from './tramites-routing.module';
import { TramitesComponent } from './tramites.component';
import { EditarTramiteComponent } from './components/editar-tramite/editar-tramite.component';
import { ModalTramiteComponent } from './components/modal-tramite/modal-tramite.component';
import { ComponentsModule } from '@admin/components/components.module';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule( {
  declarations: [
    TramitesComponent,
    EditarTramiteComponent,
    ModalTramiteComponent
  ],
  imports: [
    CommonModule,
    TramitesRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
} )
export class TramitesModule { }
