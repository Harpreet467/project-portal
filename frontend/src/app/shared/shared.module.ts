import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedService} from './service/shared.service';
import {ProgressBarService} from './service/progress-bar.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SharedService,
    ProgressBarService
  ]
})
export class SharedModule { }
