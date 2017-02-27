import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

import { FileSelectDirective } from 'ng2-file-upload';

import { DaumComponent } from './daum.component';

@NgModule({
  imports: [CommonModule, TabsModule, CustomFormsModule, FormsModule],
  declarations: [FileSelectDirective, DaumComponent],
  exports: [FileSelectDirective, TabsModule, CustomFormsModule, DaumComponent]
})
export class ShareModule { }