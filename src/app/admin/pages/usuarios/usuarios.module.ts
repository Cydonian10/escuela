import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './components/update-usuario/update-usuario.component';
import { RemoveUsuarioComponent } from './components/remove-usuario/remove-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';


@NgModule( {
  declarations: [
    UsuariosComponent,
    CreateUsuarioComponent,
    UpdateUsuarioComponent,
    RemoveUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
} )
export class UsuariosModule { }
