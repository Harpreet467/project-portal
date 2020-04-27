import {Routes} from '@angular/router';
import {ProjectComponent} from './project.component';
import {ProjectDetailsComponent} from "./project-details/project-details.component";

export const projectRoute: Routes = [
  {
    path: '',
    component: ProjectComponent
  },
  {
    path: ':id',
    component: ProjectDetailsComponent
  }
];
