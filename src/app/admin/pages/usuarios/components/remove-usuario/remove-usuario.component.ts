import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuario } from '@models/usuarios.interface';

@Component( {
  selector: 'app-remove-usuario',
  templateUrl: './remove-usuario.component.html',
  styleUrls: [ './remove-usuario.component.scss' ]
} )
export class RemoveUsuarioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveUsuarioComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: IUsuario,
  ) { }

  ngOnInit (): void {
  }

}
