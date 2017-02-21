import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation'

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  imports: [CommonModule, TabsModule, CustomFormsModule],
  declarations: [FileSelectDirective],
  exports: [FileSelectDirective, TabsModule, CustomFormsModule]
})
export class ShareModule { }