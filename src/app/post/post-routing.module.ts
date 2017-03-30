import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { PostComponent } from './post.component';
import { PostNewComponent } from './post-new.component';

const routes: Routes = [
  {
    path: 'register',
    component: PostNewComponent
  },
  {
    path: 'list',
    component: PostComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
