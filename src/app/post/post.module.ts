import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ShareModule } from './../share/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostService } from './post.service';

@NgModule({
  imports: [
    PostRoutingModule,
    ChartsModule,
    ShareModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ PostComponent ]
})
export class PostModule { }
