import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { Auth, RefreashAuth } from '@models/auth.interface';
import { environment } from '../../../environments/environment';
import { IUsuario, IUsuarioResponse } from '@models/usuarios.interface';
import { catchError, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { MenuService } from './menu.service';
import { map } from 'rxjs/operators';
import { userService } from './userLocalStorage.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService,
    private tokenService: TokenService,
    private userService: userService
  ) { }

  login ( email: string, password: string ) {

    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    } );

    return this.http.post<Auth>( `${ this.apiUrl }/api/login`, { email, password }, { headers } ).pipe(
      tap( resp => {
        this.tokenService.saveToken( resp.acces_token );
        this.profile().subscribe();
      } )
    );
  };

  profile () {
    return this.http.get<IUsuarioResponse>( `${ this.apiUrl }/api/user-profile` ).pipe(
      tap( user => {
        this.usuariosService.setUser( user.data );
        this.userService.saveUser( user.data );
      } )
    );
  }

  logout () {

    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.tokenService.getToken() }`
    } );

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'menu' );
    localStorage.removeItem( 'user' );
    return this.http.get( `${ this.apiUrl }/api/logout`, { headers } );
  }

  refreshToken () {
    const token = this.tokenService.getToken();
    this.usuariosService.setUser( this.userService.getUser() );

    if ( token ) {
      return of( true );
    }
    return of( false );
    // return this.http.get<RefreashAuth>( `${ this.apiUrl }/auth/refresh` ).pipe(
    //   tap( resp => {
    //     this.tokenService.saveToken( resp.data );
    //     this.menuService.saveMenu( resp.menu );
    //     this.profile().subscribe();
    //   } ),
    //   map( () => true ),
    //   catchError( () => of( false ) )
    // );
  }
}
