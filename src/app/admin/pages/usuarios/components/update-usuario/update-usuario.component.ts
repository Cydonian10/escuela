import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuario } from '@models/usuarios.interface';

@Component( {
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: [ './update-usuario.component.scss' ]
} )
export class UpdateUsuarioComponent implements OnInit {

  myForm: FormGroup = this.fb.group( {
    name: [ '1', [ Validators.required ] ],
    lastName: [ '1', [ Validators.required ] ],
    dni: [ '1', [ Validators.required ] ],
    rol: [ 'profesor', [ Validators.required ] ],
    telefono: [ '1', [ Validators.required ] ],
    email: [ '1', [ Validators.required ] ],
    gradoSeccion: [ '1', [ Validators.required ] ]
  } );

  constructor(
    public dialogRef: MatDialogRef<UpdateUsuarioComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: IUsuario,
    private fb: FormBuilder
  ) { }

  ngOnInit (): void {
    this.myForm.reset( this.data );
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched;
      return;
    }
    this.dialogRef.close( this.myForm.value );
  }

}
