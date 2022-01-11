import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITramite } from '@models/tramite.interface';




@Component( {
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: [ './modal-info.component.scss' ]
} )
export class ModalInfoComponent implements OnInit {

  @ViewChild( 'asdownload' ) download!: ElementRef<HTMLAnchorElement>;
  @Input() show: boolean = false;
  @Input() tramite: ITramite = {
    id: 0,
    apellidos: '',
    name: '',
    dni: '',
    email: '',
    descriptcionPadre: '',
    tramiteNombre: '',
    telefono: '',
    fecha: new Date(),
    archivoPadre: '',

    archivoDescargarAdmin: '',
    descriptcionRecepcionista: '',
    tramiteEstado: '',
    visto: false,
    updated_at: new Date(),

  };
  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit (): void {
  }

  closeModal () {
    this.onShow.emit( !this.show );
  }

  //! DESCARGANDO IMAGEN --> 🧨
  downloadFile () {
    const asdownload = this.download.nativeElement;
    asdownload.click();
  }

}
