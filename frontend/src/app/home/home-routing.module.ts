import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllHousesComponent } from './all-houses/all-houses.component';
import { HomeComponent } from './home/home.component';
import { SingleHouseComponent } from './single-house/single-house.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'all-houses',
    component: AllHousesComponent
  },
  {
    path: 'house/:id',
    component: SingleHouseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
