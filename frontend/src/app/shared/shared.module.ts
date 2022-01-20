import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HousePreviewComponent } from './house-preview/house-preview.component';


@NgModule({
  declarations: [
    HousePreviewComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HousePreviewComponent
  ]
})
export class SharedModule { }
