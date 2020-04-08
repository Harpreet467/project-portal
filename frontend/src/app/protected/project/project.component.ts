import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Constant} from '../../shared/constant';
import {SpinnerService} from '../../shared/service/spinner.service';
import {ProjectService} from './project.service';
import {Project, projectDisplayedColumns, ProjectModel} from './project.model';
import {AppConfig} from '../../app.config';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<Project>;
  displayedColumns = projectDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;

  constructor(
    public projectService: ProjectService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProjects() {
    this.spinnerService.show();
    this.subscription.add(
      this.projectService.getProject().subscribe((res: ProjectModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  downloadFile(project: Project) {
    window.location.href = environment.HOST + AppConfig.PROJECT_DOWNLOAD_API + project.file_name;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
