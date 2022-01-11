import { Component, OnInit } from '@angular/core';
import { AsistenciasService } from '@service/asistencias.service';
import { IAsistencia, IAsitenciaLocalStorage } from '@models/asistencia.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MarcarSalidaComponent } from './components/marcar-salida/marcar-salida.component';
import { LimpiaSalidasComponent } from './components/limpia-salidas/limpia-salidas.component';

@Component( {
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: [ './salida.component.scss' ]
} )
export class SalidaComponent implements OnInit {

  subscription: Subscription = new Subscription();
  asistenciasDelDia: IAsitenciaLocalStorage[] = [];
  displayedColumns: string[] = [ 'nombre', 'asistio', 'descripcion', 'descriptionSalida', 'horaEntrada', 'horaSalida', 'acciones' ];
  dataSource!: IAsistencia[];

  constructor(
    private asistenciasService: AsistenciasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
    this.getAsitenciasDia();
  }

  getAsitenciasDia () {
    this.asistenciasDelDia = this.asistenciasService.asistenciasDelDia;
    console.log( this.asistenciasService.asistenciasDelDia );
    this.dataSource = this.asistenciasService.asistenciasDelDia;
  }

  openMarcarSalida ( salida: IAsistencia ) {
    const refDialog = this.dialog.open( MarcarSalidaComponent, {
      width: "500px"
    } );

    this.subscription.add(
      refDialog.afterClosed().subscribe( resp => {
        if ( !resp ) {
          this.openMessage( 'cancelado', '🙁' );
          return;
        }
        this.asistenciasService.update( { ...resp, asistio: 1 }, salida.id ).subscribe( () => {
          this.asistenciasService.actulizarLocalStorage( resp, salida.id );
          this.openMessage( 'marcar asistencia con exito', '😃' );
        } );
      } )
    );
  }

  //!Eliminar salidas 
  eliminarSalidas () {
    const refDialog = this.dialog.open( LimpiaSalidasComponent, {
      width: "500px"
    } );
    this.subscription.add(
      refDialog.afterClosed().subscribe( resp => {
        if ( !resp ) {
          this.openMessage( 'cancelado', '🙁' );
          return;
        }
        this.asistenciasService.limpiarRegistrosAsitencia();
        this.openMessage( 'eliminado asistencias del dia', ':)' );
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
