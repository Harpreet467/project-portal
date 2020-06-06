import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {dashboardRoutes} from './dashboard.route';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {ChartModule} from "angular-highcharts";
import {Ng9OdometerModule} from "ng9-odometer";


@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    ChartModule,
    Ng9OdometerModule.forRoot(),
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
