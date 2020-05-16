import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {Filter, FilterModel, OrderBy} from "../../shared/model/filter.model";
import {RolesModel} from "../../shared/model/roles.model";
import {MatTableDataSource} from "@angular/material/table";
import {Constant} from "../../shared/constant";
import {AppConfig} from "../../app.config";
import {SpinnerService} from "../../shared/service/spinner.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared/service/shared.service";
import {ViewStudentModalComponent} from "./view-student-modal/view-student-modal.component";
import {Student, studentDisplayedColumns, StudentModel} from "./student.model";
import {StudentService} from "./student.service";
import {SaveStudentModalComponent} from "./save-student-modal/save-student-modal.component";
import {ActionModalComponent} from "./action-modal/action-modal.component";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  loggedInRoles: RolesModel = new RolesModel();
  dataSource: MatTableDataSource<Student>;
  displayedColumns = studentDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  PROJECT_URL = AppConfig.PROJECT;
  isFiltered = false;

  constructor(
    public studentService: StudentService,
    public spinnerService: SpinnerService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
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
      this.filterModel = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q'));
    }
    this.getFilteredStudents();
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
    this.getFilteredStudents();
    this.router.navigate([AppConfig.STUDENT]).then();
  }

  getFilteredStudents() {
    this.spinnerService.show();
    this.subscription.add(
      this.studentService.getFilteredStudent(this.filterModel).subscribe((res: StudentModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openViewStudentModal(student: Student) {
    this.dialog.open(ViewStudentModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: student
    });
  }

  openTakeActionModal(student: Student) {
    this.dialog.open(ActionModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: student
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredStudents();
      }
    });
  }

  openStudentModal(student: Student = null) {
    this.dialog.open(SaveStudentModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: student
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredStudents();
      }
    });
  }

  getProjectURLForEmail(email: string) {
    return {q: JSON.stringify(new Filter(
        Constant.STUDENTS, Constant.ANY, new Filter(Constant.EMAIL, Constant.EQ, email)
      ))};
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
