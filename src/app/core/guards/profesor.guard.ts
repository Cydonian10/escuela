import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '@service/auth.service';
import { UsuariosService } from '../services/usuarios.service';

@Injectable( {
    providedIn: 'root'
} )
export class ProfesorGuard implements CanActivate, CanLoad {

    usuarios: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private usuariosService: UsuariosService
    ) { }

    canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        this.usuariosService.user$.subscribe( resp => {
            console.log( resp );
            if ( resp.rol === 'profesor' ) this.router.navigateByUrl( '/auth/login' );
        } );

        return true;

    }
    canLoad (
        route: Route,
        segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        this.usuariosService.user$.subscribe( resp => {
            console.log( resp );
            if ( resp.rol === 'profesor' ) this.router.navigateByUrl( '/auth/login' );
        } );


        return true;
    }
}
