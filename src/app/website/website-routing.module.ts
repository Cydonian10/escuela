import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "",
    children: [
      { path: "home", loadChildren: () => import( "./pages/home/home.module" ).then( m => m.HomeModule ) }
    ]
  },
  {
    path: "",
    children: [
      { path: "tramites", loadChildren: () => import( "./pages/tramites/tramites.module" ).then( m => m.TramitesModule ) },
      { path: "profesores", loadChildren: () => import( "./pages/profesores/profesores.module" ).then( m => m.ProfesoresModule ) }
    ]
  },
  {
    path: "",
    children: [
      { path: "auth", loadChildren: () => import( "./pages/login/login.module" ).then( m => m.LoginModule ) }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class WebsiteRoutingModule { }
