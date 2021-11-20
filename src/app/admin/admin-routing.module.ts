import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from '@admin/components/navigation/navigation.component';

const routes: Routes = [
  {
    path: "",
    component: NavigationComponent,

    children: [
      { path: "tramites", loadChildren: () => import( './pages/tramites/tramites.module' ).then( m => m.TramitesModule ) },
      { path: "usuarios", loadChildren: () => import( './pages/usuarios/usuarios.module' ).then( m => m.UsuariosModule ) },
      { path: "asistencias", loadChildren: () => import( './pages/asistencias/asistencias.module' ).then( m => m.AsistenciasModule ) },
      { path: "asistencias", loadChildren: () => import( './pages/salida/salida.module' ).then( m => m.SalidaModule ) }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AdminRoutingModule { }
