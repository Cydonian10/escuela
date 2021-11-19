import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component( {
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: [ './create-usuario.component.scss' ]
} )
export class CreateUsuarioComponent implements OnInit {

  myForm: FormGroup = this.fb.group( {
    name: [ '1', [ Validators.required ] ],
    lastName: [ '1', [ Validators.required ] ],
    dni: [ '1', [ Validators.required ] ],
    rol: [ 'profesor', [ Validators.required ] ],
    telefono: [ '1', [ Validators.required ] ],
    email: [ '1', [ Validators.required ] ],
    password: [ '1', [ Validators.required ] ],
    gradoSeccion: [ '1', [ Validators.required ] ]
  } );

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUsuarioComponent>,
  ) { }

  ngOnInit (): void {

  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched;
      return;
    }
    this.dialogRef.close( this.myForm.value );
  }
}
