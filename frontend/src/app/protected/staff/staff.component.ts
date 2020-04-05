import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {StaffService} from './staff.service';
import {Active, Staff, staffDisplayedColumns, StaffModel} from './staff.model';
import {Constant} from '../../shared/constant';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SaveStaffModalComponent} from './save-staff-modal/save-staff-modal.component';
import {SpinnerService} from '../../shared/service/spinner.service';
import {ViewStaffDetailModalComponent} from './view-staff-detail-modal/view-staff-detail-modal.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<Staff>;
  displayedColumns = staffDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;

  constructor(
    public dialog: MatDialog,
    public staffService: StaffService,
    public spinnerService: SpinnerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getStaffs();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStaffs() {
    this.spinnerService.show();
    this.subscription.add(
      this.staffService.getStaffs().subscribe((res: StaffModel) => {
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
        this.getStaffs();
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
        this.snackBar.open('Status changed Successfully!!!');
        this.getStaffs();
      }, () => {
        this.getStaffs();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
