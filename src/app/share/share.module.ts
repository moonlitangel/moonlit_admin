import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgDaumAddressModule } from 'ng2-daum-address';

import { FileSelectDirective } from 'ng2-file-upload';

import { DaumComponent } from './daum.component';

@NgModule({
  imports: [CommonModule, TabsModule, CustomFormsModule, FormsModule, NgDaumAddressModule],
  declarations: [FileSelectDirective, DaumComponent],
  exports: [FileSelectDirective, TabsModule, CustomFormsModule, DaumComponent, NgDaumAddressModule]
})
export class ShareModule { }