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
import {ActivatedRoute, Router} from "@angular/router";
import {Filter, FilterModel} from "../../shared/model/filter.model";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  dataSource: MatTableDataSource<Project>;
  displayedColumns = projectDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  PROPOSAL_AUTHOR_URL = AppConfig.PROPOSAL_AUTHOR;
  isFiltered = false;

  constructor(
    public projectService: ProjectService,
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.get('q')) {
      this.isFiltered = true;
      this.filterModel.filters.push(JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q')));
    }
    this.getFilteredProjects();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.isFiltered = false;
    this.filterModel = new FilterModel();
    this.getFilteredProjects();
    this.router.navigate([AppConfig.PROJECT]).then();
  }

  getFilteredProjects() {
    this.spinnerService.show();
    this.subscription.add(
      this.projectService.getFilteredProjects(this.filterModel).subscribe((res: ProjectModel) => {
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

  getAuthorURLForID(id: number) {
    return {q: JSON.stringify(new Filter(
        Constant.PROJECTS, Constant.ANY, new Filter(Constant.ID, Constant.EQ, id)
      ))};
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
