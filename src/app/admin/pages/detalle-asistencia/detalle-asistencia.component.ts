import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciasService } from '@service/asistencias.service';
import { Subscription, switchMap } from 'rxjs';
import compareAsc from 'date-fns/compareAsc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsistencia } from '@models/asistencia.interface';
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
  asistencias: IAsistencia[] = [];
  asistenciasMostrar: any[] = [];

  myForm: FormGroup = this.fb.group( {
    inicio: [ , [ Validators.required ] ],
    fin: [ , [ Validators.required ] ],
  } );

  displayedColumns: string[] = [ 'Entrada', 'Salida', 'Fecha', 'Descripcion Salida', 'Tardanza', 'Asistio' ];;

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
        this.asistencias = resp.data.asistencia;
        this.nombre = resp.data.name + resp.data.lastName;
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
      const horaEntrada = format( new Date( item.horaEntrada ), 'h:mm bbb' );
      const horaSalida = format( new Date( item.horaSalida ), 'h:mm bbb' );
      const fecha = format( new Date( item.fecha ), 'y/MMM/e', { locale: es } );
      return { ...item, horaEntrada, fecha, horaSalida, total: otros.length, asistidos: asistenciasTotal };
    } );


  }

  totalAsistencias ( value: IAsistencia[] ) {
    let total = 0;
    value.forEach( element => {
      if ( element.asistio ) {
        total = total + 1;
      }
    } );
    return total;
  }

  //!EXPORTAR EN FORMATO CSV



}
