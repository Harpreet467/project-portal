import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {StaffService} from './staff.service';
import {Staff, staffDisplayedColumns, StaffModel} from './staff.model';
import {Constant} from '../../shared/constant';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddStaffModalComponent} from './add-staff-modal/add-staff-modal.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<Staff>;
  displayedColumns = staffDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;

  constructor(
    public dialog: MatDialog,
    public staffService: StaffService
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
    this.subscription.add(
      this.staffService.getStaffs().subscribe((res: StaffModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  openAddStaffModal(staff: Staff = null) {
    const dialogRef = this.dialog.open(AddStaffModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: staff
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
