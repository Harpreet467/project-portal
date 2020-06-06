import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Project, ProjectModel} from "../protected/project/project.model";
import {Filter, FilterModel, OrderBy} from "../shared/model/filter.model";
import {Constant} from "../shared/constant";
import {SpinnerService} from "../shared/service/spinner.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatStepper} from "@angular/material/stepper";
import {AppConfig} from "../app.config";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ProjectService} from "../protected/project/project.service";
import {projectDisplayedColumns, Student} from "../protected/student/student.model";
import {StudentService} from "../protected/student/student.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-student-proposal',
  templateUrl: './student-proposal.component.html',
  styleUrls: ['./student-proposal.component.scss']
})
export class StudentProposalComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  student: Student = new Student();
  filterModel: FilterModel = new FilterModel();
  dataSource: MatTableDataSource<Project>;
  displayedColumns = projectDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  selectedProjectName: string;
  studentDetailsStep = false;
  projectSelectStep = false;

  constructor(
    public spinnerService: SpinnerService,
    private studentService: StudentService,
    public projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.filterModel.filters.push(new Filter(Constant.STATUS, Constant.EQ, Constant.PROJECT_STATUS.APPROVED));
    this.filterModel.order_by.push(new OrderBy());
  }

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
      this.projectService.getFilteredProjects(this.filterModel).subscribe((res: ProjectModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  selectProject(stepper: MatStepper, project: Project) {
    this.projectSelectStep = true;
    this.student.project = project.id;
    this.selectedProjectName = project.title;
    setTimeout(() => {
      stepper.next();
    });
  }

  studentDetails(stepper: MatStepper) {
    this.studentDetailsStep = true;
    setTimeout(() => {
      stepper.next();
    });
  }

  saveStudent() {
    this.spinnerService.show();
    this.subscription.add(
      this.studentService.createStudent(this.student).subscribe(() => {
        this.snackBar.open('Successfully submitted');
        this.router.navigate([AppConfig.THANK_YOU]).then();
        this.spinnerService.hide();
      }, (error) => {
        this.snackBar.open(error.error.message);
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
