import { Routes } from '@angular/router';
import {StaffComponent} from './staff.component';
import {AddStaffModalComponent} from './add-staff-modal/add-staff-modal.component';
import {ViewStaffDetailModalComponent} from './view-staff-detail-modal/view-staff-detail-modal.component';

export const staffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent
  },
  {
    path: 'add',
    component: AddStaffModalComponent
  },
  {
    path: 'view',
    component: ViewStaffDetailModalComponent
  }
];
