import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '@service/usuarios.service';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IUsuario } from '@models/usuarios.interface';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './components/update-usuario/update-usuario.component';
import { RemoveUsuarioComponent } from './components/remove-usuario/remove-usuario.component';

@Component( {
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [ './usuarios.component.scss' ]
} )
export class UsuariosComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  displayedColumns: string[] = [ 'nombre', 'gradoSeccion', 'dni', 'email', 'rol', 'telefono', 'acciones' ];
  dataSource!: MatTableDataSource<IUsuario>;
  @ViewChild( MatPaginator ) paginator!: MatPaginator;

  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  ngOnInit (): void {
    this.usuariosService.findAll();
    this.findUsuarios();
  }

  //!inicializando el paginator
  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator;
  }

  //!TRAYENDOA TODOS LOS USUARIOS 😃
  findUsuarios () {
    this.subscription.add( this.usuariosService.usuarios$.subscribe(
      resp => {
        console.log( resp );
        this.dataSource = new MatTableDataSource<IUsuario>( resp );
      }
    ) );
  }

  //!MODAL PARA CREAR USUARIOS
  openCreateUsuario () {
    const refDialog = this.dialog.open( CreateUsuarioComponent, {
      width: "500px"
    } );

    this.subscription.add(
      refDialog.afterClosed().subscribe( resp => {
        if ( !resp ) {
          this.openMessage( 'cancelado', '🙁' );
          return;
        }
        this.usuariosService.create( resp ).subscribe( resp => {
          console.log( resp );
          this.openMessage( 'creado con exito', '😃' );
        } );
      } )
    );
  }
  //!MODAL PARA ACTULIZAR USUARIOS
  openUpdateUsuario ( usuario: IUsuario ) {
    const refDialog = this.dialog.open( UpdateUsuarioComponent, {
      width: "500px",
      data: usuario
    } );

    this.subscription.add(
      refDialog.afterClosed().subscribe( resp => {
        if ( !resp ) {
          this.openMessage( 'cancelado', '😕' );
          return;
        }
        this.usuariosService.update( resp, usuario.id ).subscribe( () => {
          this.openMessage( 'actulizado con exito', '😁' );
        } );
      } )
    );
  }

  openElimnarUsuario ( usuario: IUsuario ) {
    const refDialog = this.dialog.open( RemoveUsuarioComponent, {
      width: "500px",
      data: usuario
    } );

    this.subscription.add(
      refDialog.afterClosed().subscribe( resp => {
        if ( !resp ) {
          this.openMessage( 'cancelado', '😕' );
          return;
        }
        this.usuariosService.remove( usuario.id ).subscribe( () => {
          this.openMessage( 'actulizado con exito', '😁' );
        } );
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
