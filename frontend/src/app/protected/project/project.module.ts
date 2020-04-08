import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {projectRoute} from './project.route';
import {ProjectComponent} from './project.component';
import {ProjectService} from './project.service';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SpinnerModule} from '../../layout/spinner/spinner.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    RouterModule.forChild(projectRoute),
    CommonModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    SpinnerModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule { }
