import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOneComponent } from './header-one/header-one.component';
import { RouterModule } from '@angular/router';
import { CardServiceComponent } from './card-service/card-service.component';
import { HeaderTwoComponent } from './header-two/header-two.component';
import { FormCreateTramiteComponent } from './form-create-tramite/form-create-tramite.component';



@NgModule( {
  declarations: [
    HeaderOneComponent,
    CardServiceComponent,
    HeaderTwoComponent,
    FormCreateTramiteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderOneComponent,
    CardServiceComponent,
    HeaderTwoComponent,
    FormCreateTramiteComponent
  ]
} )
export class ComponentsModule { }
