import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { formatInTimeZone } from 'date-fns-tz';

@Component( {
  selector: 'app-marcar-salida',
  templateUrl: './marcar-salida.component.html',
  styleUrls: [ './marcar-salida.component.scss' ]
} )
export class MarcarSalidaComponent implements OnInit {

  horaSalida: Date = new Date();
  myForm: FormGroup = this.fb.group( {
    descriptionSalida: [],
    horaSalida: [],
  } );

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MarcarSalidaComponent>,
  ) { }

  ngOnInit (): void {
  }

  handleSubmit () {
    this.myForm.get( 'horaSalida' )?.setValue( formatInTimeZone( new Date(), 'America/New_York', 'yyyy/MM/dd HH:mm:ss' ) );
    this.dialogRef.close( this.myForm.value );
  }

}
