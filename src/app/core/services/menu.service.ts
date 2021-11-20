import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class MenuService {

  constructor() { }

  saveMenu ( value: any[] ) {
    localStorage.setItem( 'menu', JSON.stringify( value ) );
  }

  getMenu () {
    const token = JSON.parse( localStorage.getItem( 'menu' )! ) || [];
    return token;
  }
}
