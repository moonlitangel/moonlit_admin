import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ShareModule } from './../share/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';

@NgModule({
  imports: [
    UserRoutingModule,
    ChartsModule,
    ShareModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ UserComponent ],
  providers: [UserService]
})
export class UserModule { }
