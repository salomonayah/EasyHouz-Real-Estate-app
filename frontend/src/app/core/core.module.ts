import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserOnboardingComponent } from './user-onboarding/user-onboarding.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    UserPostsComponent,
    UserOnboardingComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule { }
