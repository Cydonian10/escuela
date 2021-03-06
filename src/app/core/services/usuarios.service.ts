import { Injectable } from '@angular/core';
import { IUsuario, IUsuariosResponse, CreateUserDto, IUsuarioResponse, UpdateUserDto } from '@models/usuarios.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rol } from '@models/rol.enum';

@Injectable( {
  providedIn: 'root'
} )
export class UsuariosService {

  private apiUrl: string = environment.apiUrl;
  private _usuarios$: BehaviorSubject<IUsuario[]> = new BehaviorSubject<IUsuario[]>( [] );
  private _user: BehaviorSubject<IUsuario> = new BehaviorSubject<IUsuario>( {
    id: 0,
    name: '',
    lastName: '',
    dni: '',
    rol: Rol.pro,
    telefono: '',
    email: '',
    password: '',
    gradoSeccion: '',
    created_at: new Date(),
    update_at: new Date()
  } );

  public get usuarios$ () {
    return this._usuarios$.asObservable();
  }

  public get user$ () {
    return this._user.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  setUser ( value: IUsuario ) {
    this._user.next( value );
  }


  findAll () {
    if ( this._usuarios$.value.length === 0 ) {
      this.http.get<IUsuariosResponse>( `${ this.apiUrl }/api/users` ).subscribe(
        resp => this._usuarios$.next( resp.data )
      );
    }
  }

  refresh () {
    this.http.get<IUsuariosResponse>( `${ this.apiUrl }/api/users` ).subscribe(
      resp => this._usuarios$.next( resp.data )
    );
  }

  create ( data: CreateUserDto ) {
    return this.http.post<IUsuarioResponse>( `${ this.apiUrl }/api/register`, data ).pipe(
      tap( () => this.refresh() )
    );
  }

  update ( changes: UpdateUserDto, id: number ) {
    return this.http.put<IUsuarioResponse>( `${ this.apiUrl }/api/users/${ id }`, changes ).pipe(
      tap( () => this.refresh() )
    );
  }

  remove ( id: number ) {
    return this.http.delete( `${ this.apiUrl }/api/users/${ id }` ).pipe(
      tap( () => this.refresh() )
    );
  }

  usuarioByEmail ( email: string ) {
    console.log( email );
    return this.http.get<IUsuarioResponse>( `${ this.apiUrl }/api/users/email/${ email }` );
  }

}
