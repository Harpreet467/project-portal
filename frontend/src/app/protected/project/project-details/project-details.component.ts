import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Constant} from "../../../shared/constant";
import {ProjectService} from "../project.service";
import {CommentModel, Project, ProjectComment} from "../project.model";
import {Location} from '@angular/common';
import {environment} from "../../../../environments/environment";
import {AppConfig} from "../../../app.config";
import {MatDialog} from "@angular/material/dialog";
import {ActionModalComponent} from "./action-modal/action-modal.component";
import {Filter, FilterModel, OrderBy} from "../../../shared/model/filter.model";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {RolesModel} from "../../../shared/model/roles.model";
import {SharedService} from "../../../shared/service/shared.service";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  projectComment: ProjectComment = new ProjectComment();
  subscription: Subscription = new Subscription();
  commentModel: CommentModel = new CommentModel();
  filterModel: FilterModel = new FilterModel();
  loggedInRoles: RolesModel = new RolesModel();
  project: Project = new Project();
  PROJECT_STATUS = Constant.PROJECT_STATUS;
  STAFF_URL = AppConfig.STAFF;
  isDisableBtn = false;
  projectId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public dialog: MatDialog,
    public location: Location,
    private alertService: AlertService,
    private storageService: StorageService,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.sharedService.refreshGetRoles();
    this.subscription.add(this.sharedService.getLoggedInRoles.subscribe((v: RolesModel) => {
      this.loggedInRoles = v;
    }));

    this.subscription.add(this.activatedRoute.paramMap.subscribe((params) => {
      this.projectId = Number(params.get(Constant.ID));
      this.filterModel.filters.push(new Filter(Constant.PROJECT, Constant.EQ, this.projectId));
      this.filterModel.order_by.push(new OrderBy(Constant.UPDATED_AT, Constant.DESC));
      this.getProjectDetails();
      this.getComments();
    }));
  }

  getProjectDetails(): void {
    this.subscription.add(this.projectService.getProjectById(this.projectId).subscribe((res: Project) => {
      this.project = res;
    }));
  }

  statusClassConditions(status) {
    return {
      'proposal': status === this.PROJECT_STATUS.PROPOSED,
      'approve': status === this.PROJECT_STATUS.APPROVED,
      'decline': status === this.PROJECT_STATUS.DECLINED,
      'defer': status === this.PROJECT_STATUS.DEFERRED,
      'withdraw': status === this.PROJECT_STATUS.WITHDRAWN,
      'skip': status === this.PROJECT_STATUS.SKIPPED
    };
  }

  getComments(): void {
    this.subscription.add(this.projectService.getFilteredComments(this.filterModel).subscribe((res: CommentModel) => {
      this.commentModel = res;
    }));
  }

  downloadFile() {
    window.location.href = environment.HOST + AppConfig.PROJECT_DOWNLOAD_API + this.project.file_name;
  }

  openCommentModal(projectStatus: string) {
    const projectComment: ProjectComment = new ProjectComment();
    projectComment.project = this.projectId;
    projectComment.project_status = projectStatus;

    this.dialog.open(ActionModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: projectComment
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getProjectDetails();
        this.getComments();
      }
    });
  }

  saveComment() {
    this.isDisableBtn = true;
    this.projectComment.last_updated_by = this.storageService.getUserName();
    this.projectComment.commented_by = Number(this.storageService.getUserId());
    this.projectComment.project = this.projectId;
    this.subscription.add(
      this.projectService.createComment(this.projectComment).subscribe(() => {
        this.isDisableBtn = false;
        this.getComments();
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
      })
    );
  }

  getStaffURLForID(id: number) {
    return {q: JSON.stringify(new Filter(Constant.ID, Constant.EQ, id))};
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
