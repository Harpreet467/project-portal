import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {StaffService} from './staff.service';
import {Staff, staffDisplayedColumns, StaffModel} from './staff.model';
import {Constant, Messages} from '../../shared/constant';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SaveStaffModalComponent} from './save-staff-modal/save-staff-modal.component';
import {SpinnerService} from '../../shared/service/spinner.service';
import {ViewStaffDetailModalComponent} from './view-staff-detail-modal/view-staff-detail-modal.component';
import {Active} from '../../shared/model/active.model';
import {ActivatedRoute, Router} from "@angular/router";
import {FilterModel} from "../../shared/model/filter.model";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  dataSource: MatTableDataSource<Staff>;
  displayedColumns = staffDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  isFiltered = false;

  constructor(
    public dialog: MatDialog,
    public staffService: StaffService,
    public spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.get('q')) {
      this.isFiltered = true;
      this.filterModel.filters.push(JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q')));
    }
    this.getFilteredStaffs();
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
    this.getFilteredStaffs();
    this.router.navigate([AppConfig.STAFF]).then();
  }

  getFilteredStaffs() {
    this.spinnerService.show();
    this.subscription.add(
      this.staffService.getFilteredStaffs(this.filterModel).subscribe((res: StaffModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openAddStaffModal(staff: Staff = null) {
    const dialogRef = this.dialog.open(SaveStaffModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: staff
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredStaffs();
      }
    });
  }

  openViewStaffModal(staff: Staff) {
    this.dialog.open(ViewStaffDetailModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: staff
    });
  }

  toggleStatusStaff(staff: Staff) {
    this.subscription.add(
      this.staffService.toggleStatusStaff(staff.id, new Active(!staff.active)).subscribe(() => {
        this.snackBar.open(Messages.STATUS_CHANGED_SUCCESSFULLY);
        this.getFilteredStaffs();
      }, () => {
        this.getFilteredStaffs();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
