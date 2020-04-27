import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Constant} from '../../shared/constant';
import {SpinnerService} from '../../shared/service/spinner.service';
import {proposalAuthorDisplayedColumns, ProposalAuthor, ProposalAuthorModel} from './proposal-author.model';
import {ProposalAuthorService} from './proposal-author.service';
import {MatDialog} from "@angular/material/dialog";
import {ViewAuthorModalComponent} from "./view-author-modal/view-author-modal.component";
import {Staff} from "../staff/staff.model";
import {SaveStaffModalComponent} from "../staff/save-staff-modal/save-staff-modal.component";
import {SaveAuthorModalComponent} from "./save-author-modal/save-author-modal.component";

@Component({
  selector: 'app-proposal-author',
  templateUrl: './proposal-author.component.html',
  styleUrls: ['./proposal-author.component.scss']
})
export class ProposalAuthorComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<ProposalAuthor>;
  displayedColumns = proposalAuthorDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;

  constructor(
    public proposalAuthorService: ProposalAuthorService,
    public spinnerService: SpinnerService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getAuthors();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAuthors() {
    this.spinnerService.show();
    this.subscription.add(
      this.proposalAuthorService.getProposalAuthor().subscribe((res: ProposalAuthorModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openViewAuthorModal(proposalAuthor: ProposalAuthor) {
    this.dialog.open(ViewAuthorModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: proposalAuthor
    });
  }

  openAddStaffModal(proposalAuthor: ProposalAuthor = null) {
    const dialogRef = this.dialog.open(SaveAuthorModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: proposalAuthor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAuthors();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
