import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HouseDetailsCardComponent } from './house-details-card/house-details-card.component';
import { HousePreviewComponent } from './house-preview/house-preview.component';
import { FooterComponent } from './layout-component/footer/footer.component';
import { SidebarComponent } from './layout-component/sidebar/sidebar.component';
import { TopbarComponent } from './layout-component/topbar/topbar.component';

@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    HousePreviewComponent,
    HouseDetailsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    HousePreviewComponent,
    HouseDetailsCardComponent
  ]
})
export class SharedModule { }
