import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {staffRoutes} from './staff.route';
import {StaffComponent} from './staff.component';
import {StaffService} from './staff.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FlexModule} from '@angular/flex-layout';
import { SaveStaffModalComponent } from './save-staff-modal/save-staff-modal.component';
import {FormsModule} from '@angular/forms';
import {SpinnerModule} from '../../layout/spinner/spinner.module';
import { ViewStaffDetailModalComponent } from './view-staff-detail-modal/view-staff-detail-modal.component';
import {AlertModule} from '../../layout/alert/alert.module';
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    StaffComponent,
    SaveStaffModalComponent,
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
        MatListModule,
        AlertModule,
        MatSlideToggleModule,
        MatMenuModule
    ],
  providers: [
    StaffService
  ]
})
export class StaffModule { }
