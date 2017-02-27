import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ShareModule } from './../share/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreComponent } from './store.component';
import { StoreListComponent } from './store-list.component';
import { StoreNewComponent } from './store-new.component';
import { StoreMenuComponent } from './store-menu.component';
import { StoreDetailComponent } from './store-detail.component';
import { StoreRoutingModule } from './store-routing.module';

import { StoreService } from './store.service';

@NgModule({
  imports: [
    StoreRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    ShareModule
  ],
  declarations: [ StoreComponent, StoreListComponent, StoreNewComponent, StoreMenuComponent, StoreDetailComponent ],
  providers: [StoreService]
})
export class StoreModule { }
