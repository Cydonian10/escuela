import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITramite } from '@models/tramite.interface';
import { UploadImageService } from '@service/upload-image.service';
import { Subscription } from 'rxjs';
import { TramitesService } from '@service/tramites.service';

@Component( {
  selector: 'app-modal-tramite',
  templateUrl: './modal-tramite.component.html',
  styleUrls: [ './modal-tramite.component.scss' ]
} )
export class ModalTramiteComponent implements OnInit {

  url: string = '';
  @ViewChild( 'asdownload' ) download!: ElementRef<HTMLAnchorElement>;
  subscription: Subscription = new Subscription();

  myForm: FormGroup = this.fb.group( {
    apellidos: [ { value: '', disabled: true }, [ Validators.required ] ],
    name: [ { value: '', disabled: true }, [ Validators.required ] ],
    dni: [ { value: '', disabled: true }, [ Validators.required ] ],
    email: [ { value: '', disabled: true }, [ Validators.required ] ],
    descriptcionPadre: [ { value: '', disabled: true }, [ Validators.required ] ],
    tramiteNombre: [ { value: '', disabled: true }, [ Validators.required ] ],
    telefono: [ { value: '', disabled: true }, [ Validators.required ] ],
    archivoPadre: [ { value: '', disabled: true } ],
    fecha: [ { value: '', disabled: true }, [ Validators.required ] ],

    archivoDescargarAdmin: [],
    descriptcionRecepcionista: [ , [ Validators.required ] ],
    tramiteEstado: [ , [ Validators.required ] ],
    visto: [ , [ Validators.required ] ],

  } );

  get archivoPadre () {
    return this.myForm.get( 'archivoPadre' );
  }

  get tramiteNombre () {
    return this.myForm.get( 'tramiteNombre' );
  }

  get fecha () {
    return this.myForm.get( 'fecha' );
  }

  constructor(
    public dialogRef: MatDialogRef<ModalTramiteComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: ITramite,
    private uploadImageService: UploadImageService,
    private fb: FormBuilder
  ) { }

  ngOnInit (): void {
    this.myForm.reset( this.data );
  }

  //!CARGANDO IMAGEN --> 🎨
  uploadFile ( e: Event ) {
    this.uploadImageService.uploadFile( e );
    this.subscription.add( this.uploadImageService.urlImage.subscribe( url => {
      this.url = url;
      // this.myForm.get( 'archivoPadre' )?.setValue( url );
    } ) );
  }

  //! DESCARGANDO IMAGEN --> 🧨
  downloadFile () {
    const asdownload = this.download.nativeElement;
    asdownload.click();
  }

  //!ENVIANDO FORMULARIO --> 🎈
  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close( this.myForm.value );
  }
}
