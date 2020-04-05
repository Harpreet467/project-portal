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
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'project-proposal',
    loadChildren: './proposal-author/proposal-author.module#ProposalAuthorModule'
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: './protected/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'staff',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {role: Constant.ROLE_ADMIN},
        loadChildren: './protected/staff/staff.module#StaffModule'
      },
      {
        path: 'project',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {role: Constant.ROLE_ADMIN},
        loadChildren: './protected/project/project.module#ProjectModule'
      },
      {
        path: 'system-profiler',
        canActivate: [AuthGuardService, RoleGuardService],
        data: {role: Constant.ROLE_ADMIN},
        loadChildren: './protected/system-profiler/system-profiler.module#SystemProfilerModule'
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
