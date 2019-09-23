import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {staffRoutes} from './staff.route';
import {StaffComponent} from './staff.component';
import {StaffService} from './staff.service';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import { AddStaffModalComponent } from './add-staff-modal/add-staff-modal.component';
import {FormsModule} from '@angular/forms';
import {SpinnerModule} from '../../layout/spinner/spinner.module';
import { ViewStaffDetailModalComponent } from './view-staff-detail-modal/view-staff-detail-modal.component';


@NgModule({
  declarations: [
    StaffComponent,
    AddStaffModalComponent,
    ViewStaffDetailModalComponent
  ],
  imports: [
    RouterModule.forChild(staffRoutes),
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    FlexModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    SpinnerModule,
    MatListModule
  ],
  providers: [
    StaffService
  ]
})
export class StaffModule { }
