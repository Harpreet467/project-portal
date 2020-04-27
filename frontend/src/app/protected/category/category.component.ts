import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Constant, Messages} from '../../shared/constant';
import {SpinnerService} from '../../shared/service/spinner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Category, categoryDisplayedColumns, CategoryModel} from './category.model';
import {CategoryService} from './category.service';
import {Status} from '../../shared/model/active.model';
import {MatDialog} from '@angular/material/dialog';
import {SaveCategoryModalComponent} from './save-category-modal/save-category-modal.component';
import {Filter} from "../../shared/model/filter.model";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<Category>;
  displayedColumns = categoryDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  PROJECT_URL = AppConfig.PROJECT;

  constructor(
    public categoryService: CategoryService,
    public spinnerService: SpinnerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCategories() {
    this.spinnerService.show();
    this.subscription.add(
      this.categoryService.getCategories().subscribe((res: CategoryModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openAddCategoryModal(category: Category = null) {
    const dialogRef = this.dialog.open(SaveCategoryModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();
      }
    });
  }

  toggleStatusCategory(category: Category) {
    this.subscription.add(
      this.categoryService.toggleStatusCategory(category.id, new Status(!category.status)).subscribe(() => {
        this.snackBar.open(Messages.STATUS_CHANGED_SUCCESSFULLY);
        this.getCategories();
      }, () => {
        this.getCategories();
      })
    );
  }

  getProjectURLForEmail(id: number) {
    return {q: JSON.stringify(new Filter(
        Constant.CATEGORY, Constant.ANY, new Filter(Constant.ID, Constant.EQ, id)
      ))};
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
