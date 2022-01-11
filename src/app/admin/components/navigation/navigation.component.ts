import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuService } from '../../../core/services/menu.service';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { IUsuario } from '@models/usuarios.interface';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
} )
export class NavigationComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  menu: any[] = [];
  usuario!: IUsuario;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe( Breakpoints.XSmall )
    .pipe(
      map( result => result.matches ),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService,
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  ngOnInit (): void {
    this.menu = this.menuService.getMenu();
    this.subscription.add(
      this.usuariosService.user$.subscribe( resp => {
        this.usuario = resp;
      } )
    );
  }

  logout () {
    this.authService.logout().subscribe();
    this.router.navigateByUrl( '/auth/login' );
  }




}
