import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StaffService} from './staff.service';
import {Staff, StaffModel} from './staff.model';
import {Constant} from '../../shared/constant';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<Staff>;
  displayedColumns = [];
  pageSize = Constant.PAGE_SIZE_LIST;

  constructor(
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
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
