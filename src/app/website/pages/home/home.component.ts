import { Component, OnInit } from '@angular/core';
import { IServicios } from '../../interfaces/servicios.interface';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  servicios: IServicios[] = [
    {
      image: 'assets/images/image1.jpg', title: 'Solicitud de tramite',
      descripcion: 'Reazlizar tramites como matricula, ect',
      url: "/tramites"
    },
    {
      image: 'assets/images/image2.jpg', title: 'Directorio de profesores',
      descripcion: 'Visualisa el listado de profesores',
      url: "/profesores"
    },
    {
      image: 'assets/images/image3.jpg', title: 'Asistencias de personal',
      descripcion: 'Marque su asistencia del dia',
      url: "/admin/asistencias"
    }
  ];

  constructor() { }

  ngOnInit (): void {
  }

}
