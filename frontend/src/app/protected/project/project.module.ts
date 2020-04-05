import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {projectRoute} from './project.route';
import {ProjectComponent} from './project.component';
import {ProjectService} from './project.service';



@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    RouterModule.forChild(projectRoute),
    CommonModule
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule { }
