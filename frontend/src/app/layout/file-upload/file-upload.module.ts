import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadComponent} from './file-upload.component';
import {MatButtonModule, MatProgressBarModule} from '@angular/material';



@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
