import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesRoutingModule } from './tramites-routing.module';
import { TramitesComponent } from './tramites.component';
import { ComponentsModule } from '../../components/components.module';
import { CreateTramiteComponent } from './components/create-tramite/create-tramite.component';
import { InfoTramiteComponent } from './components/info-tramite/info-tramite.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardTramiteComponent } from './components/card-tramite/card-tramite.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';


@NgModule( {
  declarations: [
    TramitesComponent,
    CreateTramiteComponent,
    InfoTramiteComponent,
    CardTramiteComponent,
    ModalInfoComponent,
  ],
  imports: [
    CommonModule,
    TramitesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
} )
export class TramitesModule { }
