import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {systemProfilerRoutes} from './system-profiler.route';
import {SystemProfilerComponent} from './system-profiler.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {SafePipe} from '../../shared/pipe/safe.pipe';
import {FlexModule} from '@angular/flex-layout';
import {AlertModule} from '../../layout/alert/alert.module';



@NgModule({
  declarations: [
    SystemProfilerComponent,
    SafePipe
  ],
  imports: [
    RouterModule.forChild(systemProfilerRoutes),
    CommonModule,
    MatCardModule,
    MatDividerModule,
    FlexModule,
    AlertModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SystemProfilerModule { }
