import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class TokenService {

  constructor() { }

  saveToken ( value: string ) {
    localStorage.setItem( 'token', value );
  }

  getToken () {
    const token = localStorage.getItem( 'token' );
    return token;
  }
}
