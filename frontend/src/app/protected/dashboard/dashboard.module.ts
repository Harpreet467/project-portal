import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {dashboardRoutes} from './dashboard.route';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes),
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
