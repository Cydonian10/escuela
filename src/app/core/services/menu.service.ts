import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class MenuService {

  menu = [
    {
      titulo: "Tramites",
      submenu: [ {
        titulo: "Tramites",
        url: "/admin/tramites"
      } ]
    },

    {
      titulo: "Mantenimiento",
      submenu: [
        {
          titulo: "Usuarios",
          url: "/admin/usuarios"
        },

      ]
    },
    {
      titulo: "Asitencias",
      submenu: [
        {
          titulo: 'Asistencia',
          url: '/admin/asistencias'
        },
        {
          titulo: 'Salida',
          url: '/admin/asistencias/salida'
        },

      ]
    },
    {
      titulo: "Publicaciones",
      submenu: [
        {
          titulo: 'Post',
          url: '/admin/post'
        }
      ]
    }

  ];

  constructor() { }

  saveMenu ( value: any[] ) {
    localStorage.setItem( 'menu', JSON.stringify( value ) );
  }

  getMenu () {
    const token = JSON.parse( localStorage.getItem( 'menu' )! ) || [];
    return this.menu;
  }
}
