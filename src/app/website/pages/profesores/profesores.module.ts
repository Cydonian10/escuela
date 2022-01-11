import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesoresComponent } from './profesores.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule( {
  declarations: [
    ProfesoresComponent
  ],
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ComponentsModule
  ]
} )
export class ProfesoresModule { }
