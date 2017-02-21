import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { StoreComponent } from './store.component';
import { StoreListComponent } from './store-list.component';
import { StoreNewComponent } from './store-new.component';
import { StoreDetailComponent } from './store-detail.component';

const routes: Routes = [
  {
    path: 'register',
    component: StoreNewComponent
  },
  {
    path: 'list',
    component: StoreListComponent
  },
  {
    path: ':id',
    component: StoreDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
