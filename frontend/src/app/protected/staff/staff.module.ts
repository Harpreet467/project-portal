import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {staffRoutes} from './staff.route';
import {StaffComponent} from './staff.component';
import {StaffService} from './staff.service';
import {MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    RouterModule.forChild(staffRoutes),
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    StaffService
  ]
})
export class StaffModule { }
