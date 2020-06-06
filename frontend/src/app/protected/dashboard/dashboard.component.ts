import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfig} from "../../app.config";
import {Chart} from "angular-highcharts";
import {DashboardService} from "./dashboard.service";
import {Subscription} from "rxjs";
import {FilterModel, FunctionModal} from "../../shared/model/filter.model";
import {Constant} from "../../shared/constant";
import {CountModel, NameCountModel} from "./dashboard.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  filterCount: FilterModel = new FilterModel();
  pieChart = new Chart();
  lineChart = new Chart();

  project_proposal_url = AppConfig.PROJECT_PROPOSAL;
  student_proposal_url = AppConfig.STUDENT_PROPOSAL;

  projectCount = 0;
  projectAuthorCount = 0;
  studentCount = 0;
  staffCount = 0;
  categoryCount = 0;

  constructor(
    private dashboardService: DashboardService
  ) {
    this.filterCount.functions.push(new FunctionModal(Constant.COUNT, Constant.ID));
  }

  ngOnInit() {
    this.getProjectCount();
    this.getProjectAuthorCount();
    this.getStudentCount();
    this.getStaffCount();
    this.getCategoryCount();
    this.getProjectCategory();
    this.getStaffRole();
  }

  getProjectCount() {
    this.subscription.add(
      this.dashboardService.getProjectEval(this.filterCount).subscribe((res: CountModel) => {
        this.projectCount = res.count__id;
      })
    );
  }

  getProjectAuthorCount() {
    this.subscription.add(
      this.dashboardService.getProjectAuthorEval(this.filterCount).subscribe((res: CountModel) => {
        this.projectAuthorCount = res.count__id;
      })
    );
  }

  getStudentCount() {
    this.subscription.add(
      this.dashboardService.getStudentEval(this.filterCount).subscribe((res: CountModel) => {
        this.studentCount = res.count__id;
      })
    );
  }

  getStaffCount() {
    this.subscription.add(
      this.dashboardService.getStaffEval(this.filterCount).subscribe((res: CountModel) => {
        this.staffCount = res.count__id;
      })
    );
  }

  getCategoryCount() {
    this.subscription.add(
      this.dashboardService.getProjectCategoryEval(this.filterCount).subscribe((res: CountModel) => {
        this.categoryCount = res.count__id;
      })
    );
  }

  getProjectCategory() {
    this.subscription.add(
      this.dashboardService.getProjectCategoryCount().subscribe((res: NameCountModel[]) => {
        this.pieChart = new Chart({
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Project categories'
          },
          tooltip: {
            pointFormat: '<b>{point.y} ({point.percentage:.1f}%)</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}%'
              }
            }
          },
          series: [{
            data: res
          }]
        } as any);
      })
    );
  }

  getStaffRole() {
    this.subscription.add(
      this.dashboardService.getStaffRoleCount().subscribe((res: NameCountModel[]) => {
        let categories = res.map(r => r.name);
        let data = res.map(r => r.y);

        this.lineChart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Staffs'
          },
          xAxis: {
            categories: categories,
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number of staffs'
            }
          },
          series: [{
            name: 'Count',
            data: data
          }]
        } as any);
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
