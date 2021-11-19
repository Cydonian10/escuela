import { Injectable } from '@angular/core';
import { IUsuario, IUsuariosResponse, CreateUserDto, IUsuarioResponse, UpdateUserDto } from '@models/usuarios.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class UsuariosService {

  private apiUrl: string = environment.apiUrl;
  private _usuarios$: BehaviorSubject<IUsuario[]> = new BehaviorSubject<IUsuario[]>( [] );

  public get usuarios$ () {
    return this._usuarios$.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  findAll () {
    if ( this._usuarios$.value.length === 0 ) {
      this.http.get<IUsuariosResponse>( `${ this.apiUrl }/users` ).subscribe(
        resp => this._usuarios$.next( resp.data )
      );
    }
  }

  refresh () {
    this.http.get<IUsuariosResponse>( `${ this.apiUrl }/users` ).subscribe(
      resp => this._usuarios$.next( resp.data )
    );
  }

  create ( data: CreateUserDto ) {
    return this.http.post<IUsuarioResponse>( `${ this.apiUrl }/users`, data ).pipe(
      tap( () => this.refresh() )
    );
  }

  update ( changes: UpdateUserDto, id: number ) {
    return this.http.put<IUsuarioResponse>( `${ this.apiUrl }/users/${ id }`, changes ).pipe(
      tap( () => this.refresh() )
    );
  }

  remove ( id: number ) {
    return this.http.delete( `${ this.apiUrl }/users/${ id }` ).pipe(
      tap( () => this.refresh() )
    );
  }

  usuarioByEmail ( email: string ) {
    return this.http.get<IUsuarioResponse>( `${ this.apiUrl }/users/email/${ email }` );
  }
}
