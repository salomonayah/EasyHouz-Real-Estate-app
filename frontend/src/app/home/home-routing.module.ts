import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllHousesComponent } from './all-houses/all-houses.component';
import { HomeComponent } from './home/home.component';
import { SingleHouseComponent } from './single-house/single-house.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      {
        path: 'all-houses',
        component: AllHousesComponent
      },
      {
        path: 'house/:houseId',
        component: SingleHouseComponent
      },
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
