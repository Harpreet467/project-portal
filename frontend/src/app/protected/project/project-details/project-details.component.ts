import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Constant} from "../../../shared/constant";
import {ProjectService} from "../project.service";
import {
  CommentModel,
  EmailLog,
  emailLogDisplayedColumns,
  EmailLogModel,
  Project,
  ProjectComment
} from "../project.model";
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
import {SaveProjectModalComponent} from "../save-project-modal/save-project-modal.component";
import {Student} from "../../student/student.model";
import {SentEmailModalComponent} from "./sent-email-modal/sent-email-modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  projectComment: ProjectComment = new ProjectComment();
  subscription: Subscription = new Subscription();
  commentModel: CommentModel = new CommentModel();
  filterModel: FilterModel = new FilterModel();
  loggedInRoles: RolesModel = new RolesModel();
  project: Project = new Project();
  dataSource: MatTableDataSource<EmailLog>;
  displayedColumns = emailLogDisplayedColumns;
  PROJECT_STATUS = Constant.PROJECT_STATUS;
  STUDENT_STATUS = Constant.STUDENT_STATUS;
  pageSize = Constant.PAGE_SIZE_LIST;
  STUDENT_URL = AppConfig.STUDENT;
  STAFF_URL = AppConfig.STAFF;
  approvedStudentCount = 0;
  interestedStudentCount = 0;
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
      this.getEmailLogs();
    }));
  }

  getProjectDetails(): void {
    this.approvedStudentCount = 0;
    this.interestedStudentCount = 0;
    this.subscription.add(this.projectService.getProjectById(this.projectId).subscribe((res: Project) => {
      this.project = res;

      this.project.students.forEach((student: Student) => {
        if (student.status === Constant.STUDENT_STATUS.APPROVED) {
          this.approvedStudentCount++;
        } else if (student.status === Constant.STUDENT_STATUS.INTERESTED) {
          this.interestedStudentCount++;
        }
      });
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

  getEmailLogs(): void {
    this.subscription.add(
      this.projectService.getFilteredEmailLogs(this.filterModel).subscribe((res: EmailLogModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
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
        this.getEmailLogs();
      }
    });
  }

  saveComment() {
    this.alertService.close();
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

  openProjectModal() {
    this.dialog.open(SaveProjectModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: this.project
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getProjectDetails();
      }
    });
  }

  getStudentsForProjectID(id: number, status: string) {
    const filterModel: FilterModel = new FilterModel();
    filterModel.filters.push(new Filter(
      Constant.PROJECTS, Constant.HAS, new Filter(Constant.ID, Constant.EQ, id)
    ));
    filterModel.filters.push(new Filter(Constant.STATUS, Constant.EQ, status));
    return {q: JSON.stringify(filterModel)};
  }

  getStudentsForID(id: number) {
    const filterModel: FilterModel = new FilterModel();
    filterModel.filters.push(new Filter(Constant.ID, Constant.EQ, id));
    return {q: JSON.stringify(filterModel)};
  }

  openSentEmailModal() {
    this.dialog.open(SentEmailModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: this.project
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getEmailLogs();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
