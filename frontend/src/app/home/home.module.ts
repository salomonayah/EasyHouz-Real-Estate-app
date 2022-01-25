import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { AllHousesComponent } from './all-houses/all-houses.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SingleHouseComponent } from './single-house/single-house.component';


@NgModule({
  declarations: [
    HomeComponent,
    AllHousesComponent,
    SingleHouseComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
