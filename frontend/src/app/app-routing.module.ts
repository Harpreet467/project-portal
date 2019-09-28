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
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: './protected/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'staff',
        canActivate: [RoleGuardService],
        data: {role: Constant.ROLE_ADMIN},
        loadChildren: './protected/staff/staff.module#StaffModule'
      },
      {
        path: 'system-profiler',
        canActivate: [RoleGuardService],
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
