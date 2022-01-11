import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOneComponent } from './header-one/header-one.component';
import { RouterModule } from '@angular/router';
import { CardServiceComponent } from './card-service/card-service.component';
import { HeaderTwoComponent } from './header-two/header-two.component';
import { FormCreateTramiteComponent } from './form-create-tramite/form-create-tramite.component';
import { CardProfesorComponent } from './card-profesor/card-profesor.component';



@NgModule( {
  declarations: [
    HeaderOneComponent,
    CardServiceComponent,
    HeaderTwoComponent,
    FormCreateTramiteComponent,
    CardProfesorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderOneComponent,
    CardServiceComponent,
    HeaderTwoComponent,
    FormCreateTramiteComponent,
    CardProfesorComponent
  ]
} )
export class ComponentsModule { }
