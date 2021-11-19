import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TramitesService } from '@service/tramites.service';
import { UploadImageService } from '@service/upload-image.service';
import { CreateTramiteDto } from '@models/tramite.interface';


@Component( {
  selector: 'app-create-tramite',
  templateUrl: './create-tramite.component.html',
  styleUrls: [ './create-tramite.component.scss' ]
} )
export class CreateTramiteComponent implements OnInit {

  private suscriptions: Subscription = new Subscription();
  url: string = '';
  show: boolean = false;
  codigo: number = 0;

  //! MY FOMULARIO
  public myForm: FormGroup = this.fb.group( {
    name: [ '', [ Validators.required ] ],
    apellidos: [ '', [ Validators.required ] ],
    dni: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required ] ],
    descriptcionPadre: [ '', [ Validators.required ] ],
    tramiteNombre: [ '', [ Validators.required ] ],
    telefono: [ '', [ Validators.required ] ],
    archivoPadre: [],
    fecha: [ new Date(), [ Validators.required ] ],
  } );


  campoValido ( campo: string ) {
    return this.myForm.get( campo )?.errors && this.myForm.get( campo )?.touched;
  }

  constructor(
    private tramitesService: TramitesService,
    private fb: FormBuilder,
    private uploadImageService: UploadImageService
  ) { }

  ngOnInit (): void {
  }

  ngOnDestroY () {
    this.suscriptions.unsubscribe();
  }

  //!CARGANDO IMAGEN --> 🎨
  uploadFile ( e: Event ) {
    this.uploadImageService.uploadFile( e );
    this.suscriptions.add( this.uploadImageService.urlImage.subscribe( url => {
      this.url = url;
      this.myForm.get( 'archivoPadre' )?.setValue( url );
    } ) );
  }

  onshow ( e: boolean ) {
    this.show = e;
  }

  //!ENVIANDO EL FORMULARIO
  handleSubmit () {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const newTramite: CreateTramiteDto = {
      apellidos: this.myForm.get( 'apellidos' )?.value,
      name: this.myForm.get( 'name' )?.value,
      dni: this.myForm.get( 'dni' )?.value,
      email: this.myForm.get( 'email' )?.value,
      descriptcionPadre: this.myForm.get( 'descriptcionPadre' )?.value,
      tramiteNombre: this.myForm.get( 'tramiteNombre' )?.value,
      telefono: this.myForm.get( 'telefono' )?.value,
      archivoPadre: this.myForm.get( 'archivoPadre' )?.value,
      fecha: this.myForm.get( 'fecha' )?.value,
    };

    this.suscriptions.add( this.tramitesService.create( newTramite ).subscribe( resp => {
      this.codigo = resp.data.id;
      this.show = true;
    } ) );
  }
}
