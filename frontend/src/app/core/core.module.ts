import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SharedModule } from '../shared/shared.module';
import { AddNewOfferComponent } from './add-new-offer/add-new-offer.component';
import { CoreRoutingModule } from './core-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserOnboardingComponent } from './user-onboarding/user-onboarding.component';
import { UserPostsComponent } from './user-posts/user-posts.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    UserPostsComponent,
    UserOnboardingComponent,
    AddNewOfferComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    FormsModule,
    ImageCropperModule
  ]
})
export class CoreModule { }
