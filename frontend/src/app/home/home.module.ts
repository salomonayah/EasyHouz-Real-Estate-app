import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AllHousesComponent } from './all-houses/all-houses.component';
import { SingleHouseComponent } from './single-house/single-house.component';


@NgModule({
  declarations: [
    HomeComponent,
    AllHousesComponent,
    SingleHouseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
