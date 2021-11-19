import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component( {
  selector: 'app-card-tramite',
  templateUrl: './card-tramite.component.html',
  styleUrls: [ './card-tramite.component.scss' ]
} )
export class CardTramiteComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() codigo: number = 0;
  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit (): void {
  }

  closeModal () {
    this.onShow.emit( !this.show );
  }


}
