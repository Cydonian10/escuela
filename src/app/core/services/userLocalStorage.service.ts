import { Injectable } from '@angular/core';

@Injectable( {
    providedIn: 'root'
} )
export class userService {

    constructor() { }

    saveUser ( value: any ) {
        localStorage.setItem( 'user', JSON.stringify( value ) );
    }

    getUser () {
        const user = JSON.parse( localStorage.getItem( 'user' )! ) || null;
        return user;
    }
}
