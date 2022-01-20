import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'main',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./core/core.module').then((mod) => mod.CoreModule),
  },
  {
    path: '',
    // Home module will contain all the component user can access without authentication
    loadChildren: () => import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
