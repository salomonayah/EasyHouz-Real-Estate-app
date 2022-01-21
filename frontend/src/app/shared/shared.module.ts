import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HousePreviewComponent } from './house-preview/house-preview.component';
import { FooterComponent } from './layout-component/footer/footer.component';
import { TopbarComponent } from './layout-component/topbar/topbar.component';

@NgModule({
  declarations: [
    HousePreviewComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HousePreviewComponent,
    TopbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
