import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITramite } from '@models/tramite.interface';

@Component( {
  selector: 'app-editar-tramite',
  templateUrl: './editar-tramite.component.html',
  styleUrls: [ './editar-tramite.component.scss' ]
} )
export class EditarTramiteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditarTramiteComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: ITramite,
  ) { }

  ngOnInit (): void {
  }

}
