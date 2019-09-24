import { Routes } from '@angular/router';
import {StaffComponent} from './staff.component';
import {SaveStaffModalComponent} from './save-staff-modal/save-staff-modal.component';
import {ViewStaffDetailModalComponent} from './view-staff-detail-modal/view-staff-detail-modal.component';

export const staffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent
  },
  {
    path: 'add',
    component: SaveStaffModalComponent
  },
  {
    path: 'view',
    component: ViewStaffDetailModalComponent
  }
];
