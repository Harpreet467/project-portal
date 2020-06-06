import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuardService} from './shared/service/auth-guard.service';
import {RoleGuardService} from './shared/service/role-guard.service';
import {Roles} from './shared/constant';
import {ThankYouComponent} from "./thank-you/thank-you.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'project-proposal',
    loadChildren: () => import('./project-proposal/project-proposal.module').then(m => m.ProjectProposalModule)
  },
  {
    path: 'student-proposal',
    loadChildren: () => import('./student-proposal/student-proposal.module').then(m => m.StudentProposalModule)
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./protected/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'staff',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN]},
        loadChildren: () => import('./protected/staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'proposal-author',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN, Roles.THIRD_LEVEL, Roles.SECOND_LEVEL, Roles.FIRST_LEVEL]},
        loadChildren: () => import('./protected/proposal-author/proposal-author.module').then(m => m.ProposalAuthorModule)
      },
      {
        path: 'project',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN, Roles.THIRD_LEVEL, Roles.SECOND_LEVEL, Roles.FIRST_LEVEL]},
        loadChildren: () => import('./protected/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'student',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN, Roles.THIRD_LEVEL, Roles.SECOND_LEVEL, Roles.FIRST_LEVEL]},
        loadChildren: () => import('./protected/student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'category',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN]},
        loadChildren: () => import('./protected/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'system-profiler',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN]},
        loadChildren: () => import('./protected/system-profiler/system-profiler.module').then(m => m.SystemProfilerModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
