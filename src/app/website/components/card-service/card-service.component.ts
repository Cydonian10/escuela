import { Component, Input, OnInit } from '@angular/core';
import { IServicios } from '@website/interfaces/servicios.interface';

@Component( {
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: [ './card-service.component.scss' ]
} )
export class CardServiceComponent implements OnInit {

  @Input() serivios: IServicios = {
    image: '',
    title: '',
    descripcion: '',
    url: ''
  };

  constructor() { }

  ngOnInit (): void {
  }

}
