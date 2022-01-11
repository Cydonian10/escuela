import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAsistenciaDto, IAsitenciaLocalStorage, IAsitenciaResponse, IResponseAsistenciaByUsuario, UpdateAsisteciaDto } from '@models/asistencia.interface';
import { environment } from 'src/environments/environment';
import { IAsistencia } from '../../models/asistencia.interface';

@Injectable( {
  providedIn: 'root'
} )
export class AsistenciasService {

  asistenciasDelDia: IAsitenciaLocalStorage[] = [];
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
    this.asistenciasDelDia = JSON.parse( localStorage.getItem( 'asistenciasDia' )! ) || [];
  }


  create ( data: CreateAsistenciaDto ) {
    return this.http.post<IAsitenciaResponse>( `${ this.apiUrl }/api/asistencias`, data );
  }

  update ( changes: UpdateAsisteciaDto, id: number ) {
    return this.http.put<IAsitenciaResponse>( `${ this.apiUrl }/api/asistencias/${ id }`, changes );
  };

  localStorageAsistencia ( asistencia: IAsitenciaLocalStorage ) {
    this.asistenciasDelDia.push( asistencia );
    localStorage.setItem( 'asistenciasDia', JSON.stringify( this.asistenciasDelDia ) );
  }

  actulizarLocalStorage ( changes: UpdateAsisteciaDto, id: number ) {
    this.asistenciasDelDia = this.asistenciasDelDia.map( item => {
      if ( item.id === id ) {
        item.horaSalida = changes.horaSalida!;
        item.descriptionSalida = changes.descriptionSalida || '';
      }
      return item;
    } );
    localStorage.setItem( 'asistenciasDia', JSON.stringify( this.asistenciasDelDia ) );

  }

  //!TRAERME LAS ASISTENCIAS POR USUARIO
  asistenciaByUsuario ( id: number ) {
    return this.http.get<IResponseAsistenciaByUsuario>( `${ this.apiUrl }/api/users/usuarios-asistencias/${ id }` );
  }

  limpiarRegistrosAsitencia () {
    this.asistenciasDelDia = [];
    localStorage.removeItem( 'asistenciasDia' );
  }
}
