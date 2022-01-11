import { Component, Input, OnInit } from '@angular/core';
import { Rol } from '@models/rol.enum';
import { IUsuario } from '@models/usuarios.interface';

@Component( {
  selector: 'app-card-profesor',
  templateUrl: './card-profesor.component.html',
  styleUrls: [ './card-profesor.component.scss' ]
} )
export class CardProfesorComponent implements OnInit {

  @Input() profesor: IUsuario = {
    id: 0,
    name: '',
    lastName: '',
    dni: '',
    rol: Rol.adm,
    telefono: '',
    email: '',
    password: '',
    gradoSeccion: '',
    created_at: new Date(),
    update_at: new Date()
  };

  constructor() { }

  ngOnInit (): void {
  }

}
