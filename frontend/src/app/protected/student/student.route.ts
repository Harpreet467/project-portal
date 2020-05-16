import {Routes} from '@angular/router';
import {StudentComponent} from "./student.component";
import {ViewStudentModalComponent} from "./view-student-modal/view-student-modal.component";
import {SaveStudentModalComponent} from "./save-student-modal/save-student-modal.component";

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentComponent
  },
  {
    path: '',
    component: ViewStudentModalComponent
  },
  {
    path: '',
    component: SaveStudentModalComponent
  }
];
