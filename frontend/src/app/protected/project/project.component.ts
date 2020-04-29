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
import {Filter, FilterModel, OrderBy} from "../../shared/model/filter.model";
import {RolesModel} from "../../shared/model/roles.model";
import {SharedService} from "../../shared/service/shared.service";
import {ProposalAuthor} from "../proposal-author/proposal-author.model";
import {SaveAuthorModalComponent} from "../proposal-author/save-author-modal/save-author-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {SaveProjectModalComponent} from "./save-project-modal/save-project-modal.component";

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
  loggedInRoles: RolesModel = new RolesModel();
  dataSource: MatTableDataSource<Project>;
  displayedColumns = projectDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  PROPOSAL_AUTHOR_URL = AppConfig.PROPOSAL_AUTHOR;
  isFiltered = false;

  constructor(
    public projectService: ProjectService,
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.filterModel.order_by.push(new OrderBy());
  }

  ngOnInit() {
    this.sharedService.refreshGetRoles();
    this.subscription.add(this.sharedService.getLoggedInRoles.subscribe((v: RolesModel) => {
      this.loggedInRoles = v;
    }));

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
    this.filterModel.order_by.push(new OrderBy());
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

  openProjectModal(project: Project = null) {
    this.dialog.open(SaveProjectModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: project
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredProjects();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
