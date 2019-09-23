import { Routes } from '@angular/router';
import {StaffComponent} from './staff.component';
import {AddStaffModalComponent} from './add-staff-modal/add-staff-modal.component';

export const staffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent
  },
  {
    path: 'add',
    component: AddStaffModalComponent
  }
];
