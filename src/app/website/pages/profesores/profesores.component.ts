import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from '@models/usuarios.interface';
import { UsuariosService } from '@service/usuarios.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: [ './profesores.component.scss' ]
} )
export class ProfesoresComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  profesores: IUsuario[] = [];

  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  ngOnInit (): void {
    this.usuariosService.findAll();

    this.subscription.add(
      this.usuariosService.usuarios$.subscribe( resp => {
        this.profesores = resp;
        console.log( this.profesores );
      } )
    );

  }

}
