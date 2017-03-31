import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ShareModule } from './../share/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImageComponent } from './image.component';
import { ImageRoutingModule } from './image-routing.module';

@NgModule({
  imports: [
    ImageRoutingModule,
    ChartsModule,
    ShareModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ ImageComponent ]
})
export class ImageModule { }
