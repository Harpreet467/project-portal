import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuardService} from './shared/service/auth-guard.service';
import {RoleGuardService} from './shared/service/role-guard.service';
import {Constant} from './shared/constant';


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
    loadChildren: () => import('./proposal-author/proposal-author.module').then(m => m.ProposalAuthorModule)
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
        data: {role: Constant.ROLE_ADMIN},
        loadChildren: () => import('./protected/staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'project',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {role: Constant.ROLE_ADMIN},
        loadChildren: () => import('./protected/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'system-profiler',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {role: Constant.ROLE_ADMIN},
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
