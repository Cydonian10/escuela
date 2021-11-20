import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { Auth, RefreashAuth } from '@models/auth.interface';
import { environment } from '../../../environments/environment';
import { IUsuario, IUsuarioResponse } from '@models/usuarios.interface';
import { catchError, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { MenuService } from './menu.service';
import { map } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService,
    private tokenService: TokenService,
    private menuService: MenuService
  ) { }

  login ( email: string, password: string ) {
    return this.http.post<Auth>( `${ this.apiUrl }/auth/login`, { email, password } ).pipe(
      tap( resp => {
        this.tokenService.saveToken( resp.data.acc_token );
        this.menuService.saveMenu( resp.menu );
        this.profile().subscribe();
      } )
    );
  };

  profile () {
    return this.http.get<IUsuarioResponse>( `${ this.apiUrl }/users/perfil` ).pipe(
      tap( user => this.usuariosService.setUser( user.data ) )
    );
  }

  logout () {
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'menu' );
  }

  refreshToken () {
    const token = this.tokenService.getToken();
    return this.http.get<RefreashAuth>( `${ this.apiUrl }/auth/refresh` ).pipe(
      tap( resp => {
        this.tokenService.saveToken( resp.data );
        this.menuService.saveMenu( resp.menu );
        this.profile().subscribe();
      } ),
      map( () => true ),
      catchError( () => of( false ) )
    );
  }
}
