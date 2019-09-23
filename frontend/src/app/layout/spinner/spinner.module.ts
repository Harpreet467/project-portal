import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from './spinner.component';
import {MatProgressSpinnerModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FlexModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule { }
