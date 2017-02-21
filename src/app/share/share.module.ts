import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  imports: [CommonModule],
  declarations: [FileSelectDirective],
  exports: [FileSelectDirective]
})
export class ShareModule { }