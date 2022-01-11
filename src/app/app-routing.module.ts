import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfesorGuard } from './core/guards/profesor.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import( "./website/website.module" ).then( m => m.WebsiteModule )
  },
  {
    path: "admin",
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () => import( "./admin/admin.module" ).then( m => m.AdminModule )
  }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
