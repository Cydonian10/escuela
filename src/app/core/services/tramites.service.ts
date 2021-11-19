import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITramite, TramiteResponse, CreateTramiteDto, CreateTramiteReponse, UpdateTramiteDto } from '@models/tramite.interface';

@Injectable( {
  providedIn: 'root'
} )
export class TramitesService {

  private apiUrl: string = environment.apiUrl;
  private _tramite$: BehaviorSubject<ITramite[]> = new BehaviorSubject<ITramite[]>( [] );

  public get tramite$ () {
    return this._tramite$.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  findAll () {
    if ( this._tramite$.value.length === 0 ) {
      this.http.get<TramiteResponse>( `${ this.apiUrl }/tramites` ).subscribe(
        resp => this._tramite$.next( resp.data )
      );
    }
  }

  findOne ( id: number ) {
    return this.http.get<CreateTramiteReponse>( `${ this.apiUrl }/tramites/${ id }` );
  }

  refresh () {
    this.http.get<TramiteResponse>( `${ this.apiUrl }/tramites` ).subscribe(
      resp => this._tramite$.next( resp.data )
    );
  }

  create ( data: CreateTramiteDto ) {
    return this.http.post<CreateTramiteReponse>( `${ this.apiUrl }/tramites`, data );
  }

  update ( changes: UpdateTramiteDto, id: number ) {
    return this.http.put<CreateTramiteReponse>( `${ this.apiUrl }/tramites/${ id }`, changes ).pipe(
      tap( () => this.refresh() )
    );
  }

  remove ( id: number ) {
    return this.http.delete( `${ this.apiUrl }/tramites/${ id }` ).pipe(
      tap( () => this.refresh() )
    );
  }

}
