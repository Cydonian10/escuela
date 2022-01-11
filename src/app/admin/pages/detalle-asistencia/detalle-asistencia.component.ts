import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciasService } from '@service/asistencias.service';
import { Subscription, switchMap } from 'rxjs';
import compareAsc from 'date-fns/compareAsc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsistencia, IAsistenciaNuevo } from '@models/asistencia.interface';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';

@Component( {
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.component.html',
  styleUrls: [ './detalle-asistencia.component.scss' ]
} )
export class DetalleAsistenciaComponent implements OnInit {


  private subscription: Subscription = new Subscription();
  nombre: string = '';
  asistencias: IAsistenciaNuevo[] = [];
  asistenciasMostrar: any[] = [];

  myForm: FormGroup = this.fb.group( {
    inicio: [ , [ Validators.required ] ],
    fin: [ , [ Validators.required ] ],
  } );

  displayedColumns: string[] = [ 'Entrada', 'Salida', 'Fecha', 'Descripcion Salida', 'Tardanza', 'Asistio', 'Asistidos', 'total' ];;

  constructor(
    private asistenciasService: AsistenciasService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  };

  ngOnInit (): void {
    this.findOne();

  };

  findOne () {
    this.subscription.add(
      this.activatedRoute.params.pipe(
        switchMap( ( { id } ) => this.asistenciasService.asistenciaByUsuario( id ) )
      ).subscribe( resp => {
        console.log( resp );
        this.asistencias = resp.data;
        this.nombre = resp.data[ 0 ].name + resp.data[ 0 ].lastName;
      } )
    );
  }

  filtrar () {

    const inicio = this.myForm.get( 'inicio' )?.value;
    const fin = this.myForm.get( 'fin' )?.value;

    const otros = this.asistencias.filter( ( item: any ) => {
      return compareAsc( new Date( item.fecha ), new Date( inicio ) ) == 1 && compareAsc( new Date( item.fecha ), new Date( fin ) ) == -1;
    } );

    const asistenciasTotal = this.totalAsistencias( this.asistencias );

    this.asistenciasMostrar = otros.map( ( item ) => {
      const horaEntrada = item.horaEntrada ? format( new Date( item.horaEntrada ), 'h:mm bbb' ) : null;
      const horaSalida = item.horaSalida ? format( new Date( item.horaSalida ), 'h:mm bbb' ) : null;
      const fecha = format( new Date( item.fecha ), 'y/MMM/dd', { locale: es } );
      return { ...item, horaEntrada, fecha, horaSalida, total: otros.length, asistidos: asistenciasTotal };
    } );

    console.log( this.asistenciasMostrar );


  }

  totalAsistencias ( value: IAsistencia[] ) {
    let total = 0;
    console.log( value );
    value.forEach( element => {
      if ( element.asistio === 1 ) {
        total = total + 1;
      }
    } );
    return total;
  }


}
