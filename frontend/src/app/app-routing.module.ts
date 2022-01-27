import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/core.module').then((mod) => mod.CoreModule),
  },
  {
    path: 'home',
    // Home module will contain all the component user can access without authentication
    loadChildren: () => import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
