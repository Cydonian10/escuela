import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ITramite } from '@models/tramite.interface';
import { TramitesService } from '@service/tramites.service';

@Component( {
  selector: 'app-info-tramite',
  templateUrl: './info-tramite.component.html',
  styleUrls: [ '../create-tramite/create-tramite.component.scss' ]
} )
export class InfoTramiteComponent implements OnInit {

  show: boolean = false;
  myInput: FormControl = new FormControl( '', [ Validators.required ] );
  tramite!: ITramite;

  constructor(
    private tramitesService: TramitesService
  ) { }

  ngOnInit (): void {
  }

  //! abrir el modal
  onshow ( e: boolean ) {
    this.show = e;
  }

  //! handled submit
  handleSubmit ( e: Event ) {

    e.preventDefault();

    if ( this.myInput.invalid ) {
      this.myInput.markAllAsTouched;
      return;
    }
    this.tramitesService.findOne( this.myInput.value ).subscribe( resp => {
      this.tramite = resp.data;
      this.show = true;
    } );
  }
}
