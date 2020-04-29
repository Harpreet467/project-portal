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
import {SaveAuthorModalComponent} from "./save-author-modal/save-author-modal.component";
import {AppConfig} from "../../app.config";
import {Filter, FilterModel, OrderBy} from "../../shared/model/filter.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared/service/shared.service";
import {RolesModel} from "../../shared/model/roles.model";

@Component({
  selector: 'app-proposal-author',
  templateUrl: './proposal-author.component.html',
  styleUrls: ['./proposal-author.component.scss']
})
export class ProposalAuthorComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  loggedInRoles: RolesModel = new RolesModel();
  dataSource: MatTableDataSource<ProposalAuthor>;
  displayedColumns = proposalAuthorDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  PROJECT_URL = AppConfig.PROJECT;
  isFiltered = false;

  constructor(
    public proposalAuthorService: ProposalAuthorService,
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
      this.filterModel.filters.push(JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q')));
    }
    this.getFilteredAuthors();
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
    this.getFilteredAuthors();
    this.router.navigate([AppConfig.PROPOSAL_AUTHOR]).then();
  }

  getFilteredAuthors() {
    this.spinnerService.show();
    this.subscription.add(
      this.proposalAuthorService.getFilteredProposalAuthor(this.filterModel).subscribe((res: ProposalAuthorModel) => {
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

  openAuthorModal(proposalAuthor: ProposalAuthor = null) {
    const dialogRef = this.dialog.open(SaveAuthorModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: proposalAuthor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredAuthors();
      }
    });
  }

  getProjectURLForEmail(email: string) {
    return {q: JSON.stringify(new Filter(
      Constant.PROPOSAL_AUTHORS, Constant.HAS, new Filter(Constant.EMAIL, Constant.EQ, email)
      ))};
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
