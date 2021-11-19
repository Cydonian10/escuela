import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ITramite } from '@models/tramite.interface';
import { TramitesService } from '@service/tramites.service';
import { Subscription } from 'rxjs';
import { ModalTramiteComponent } from './components/modal-tramite/modal-tramite.component';
import { EditarTramiteComponent } from './components/editar-tramite/editar-tramite.component';


@Component( {
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: [ './tramites.component.scss' ]
} )
export class TramitesComponent implements OnInit, OnDestroy {

  url: string = '';
  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = [ 'nombre', 'tramiteEstado', 'visto', 'tramiteNombre', 'fecha', 'editar' ];
  dataSource!: MatTableDataSource<ITramite>;
  @ViewChild( MatPaginator ) paginator!: MatPaginator;

  constructor(
    private tramitesService: TramitesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  ngOnInit (): void {
    this.tramitesService.findAll();
    this.getTramites();
  }

  //! pidiendo los todos los tramites
  getTramites () {
    this.subscription.add(
      this.tramitesService.tramite$.subscribe( resp => {
        this.dataSource = new MatTableDataSource<ITramite>( resp );
      } )
    );
  }

  //!inicializando el paginator
  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator;
  }

  //!abriendo un modal para editar tarea
  openUpdate ( tramite: ITramite ) {
    const dialogRef = this.dialog.open( ModalTramiteComponent, {
      width: '850px',
      data: tramite,
      disableClose: true
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( !result ) {
        this.openMessage( 'Cancelado', '🙁' );
        console.log( 'cancelados' );
        return;
      }
      this.tramitesService.update( result, tramite.id ).subscribe( ( resp ) => {
        this.openMessage( 'actulizado con exito', '😀' );
      } );
    } );
  }

  //!eliminado un tramite
  removeTramite ( tramite: ITramite ) {
    const dialogRef = this.dialog.open( EditarTramiteComponent, {
      width: "400px",
      data: tramite
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( !result ) {
        this.openMessage( 'Cancelado', '🙁' );
        return;
      }

      this.tramitesService.remove( tramite.id ).subscribe( ( resp ) => {
        this.openMessage( 'eliminado con exito', '😀' );
      } );
    } );
  }

  //!RETROALIMENTACION DE LO SUCCEDIDO 
  openMessage ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'start',
      verticalPosition: 'top',
    } );
  }


}

