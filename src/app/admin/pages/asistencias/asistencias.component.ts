import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from '@models/rol.enum';
import { IUsuario } from '@models/usuarios.interface';
import { UsuariosService } from '@service/usuarios.service';
import { AsistenciasService } from '@service/asistencias.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IAsitenciaLocalStorage } from '@models/asistencia.interface';
import formatDistance from 'date-fns/formatDistance';
import es from 'date-fns/locale/es';


@Component( {
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: [ './asistencias.component.scss' ]
} )
export class AsistenciasComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  myInput: FormControl = new FormControl( '', Validators.required );
  usuario: IUsuario = {
    id: 0,
    name: '',
    lastName: '',
    dni: '',
    rol: Rol.pro,
    telefono: '',
    email: '',
    password: '',
    gradoSeccion: ''
  };
  horaEntrada: Date = new Date();
  error: string = '';
  horaEntradaDiario: Date = new Date();

  myForm: FormGroup = this.fb.group( {
    usuarioId: [ , Validators.required ],
    horaEntrada: [ , Validators.required ],
    description: [ , Validators.required ]
  } );

  constructor(
    private usuariosService: UsuariosService,
    private asistenciasService: AsistenciasService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder

  ) { }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  };
  ngOnInit (): void {
    this.horaEntradaDiario.setHours( 8, 0, 0 );
  };

  //!TRAER USUARIO POR EMAIL
  usuarioByEmail () {
    this.error = '';

    if ( this.myInput.invalid ) {
      this.myInput.markAllAsTouched;
      return;
    }

    this.subscription.add(
      this.usuariosService.usuarioByEmail( this.myInput.value.trim() ).subscribe(
        {
          next: resp => this.usuario = resp.data,
          error: ( e ) => this.error = e.error.message
        }
      )
    );

    this.myInput.reset();
  }

  //!MARCAR ASISTENCIA
  marcarAsistencia () {
    const horas = formatDistance( this.horaEntradaDiario, new Date(), { locale: es } );
    this.myForm.get( 'usuarioId' )?.setValue( this.usuario.id );
    this.myForm.get( 'horaEntrada' )?.setValue( new Date() );
    this.myForm.get( 'description' )?.setValue( 'Lego tarde' + ' ' + horas + 'tarde' );

    console.log( this.myForm.value );

    this.subscription.add(
      this.asistenciasService.create( this.myForm.value ).subscribe( resp => {
        console.log( resp, 'asistencias' );
        this.openMessage( 'Asistencia registrada', '😃' );
        this.asistenciasService.localStorageAsistencia( resp.data as IAsitenciaLocalStorage );
        this.route.navigateByUrl( "/admin/asistencias/salida" );
      } )
    );
  }

  //!RETROALIMENTACION DE LO SUCCEDIDO 
  openMessage ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 3000
    } );
  }
}
