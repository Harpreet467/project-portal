import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Constant} from '../../shared/constant';
import {SpinnerService} from '../../shared/service/spinner.service';
import {proposalAuthorDisplayedColumns, ProposalAuthor, ProposalAuthorModel} from './proposal-author.model';
import {ProposalAuthorService} from './proposal-author.service';

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
    public spinnerService: SpinnerService
  ) {
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
      this.proposalAuthorService.getProposalAuthor().subscribe((res: ProposalAuthorModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
