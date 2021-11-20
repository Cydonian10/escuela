import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '@service/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.refreshToken().pipe(
      tap( isAuth => {
        if ( !isAuth ) this.router.navigateByUrl( '/auth/login' );
      } )
    );

  }
  canLoad (
    route: Route,
    segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.refreshToken().pipe(
      tap( isAuth => {
        if ( !isAuth ) this.router.navigateByUrl( '/auth/login' );
      } )
    );
  }
}
