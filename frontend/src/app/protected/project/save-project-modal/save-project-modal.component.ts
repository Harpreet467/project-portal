import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {Project, ProjectComment} from "../project.model";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import {ProjectService} from "../project.service";
import {Category, CategoryModel} from "../../category/category.model";
import {CategoryService} from "../../category/category.service";
import {Filter, FilterModel} from "../../../shared/model/filter.model";
import {Constant} from "../../../shared/constant";

@Component({
  selector: 'app-save-project-modal',
  templateUrl: './save-project-modal.component.html',
  styleUrls: ['./save-project-modal.component.scss']
})
export class SaveProjectModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  project: Project = new Project();
  categories: Category[];
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<ProjectComment | ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    public projectService: ProjectService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
    this.filterModel.filters.push(new Filter(Constant.STATUS, Constant.EQ, true));
  }

  ngOnInit() {
    this.project = this.data;
    this.getProjectCategory();
  }

  getProjectCategory() {
    this.subscription.add(
      this.categoryService.getFilteredCategories(this.filterModel).subscribe((res: CategoryModel) => {
        this.categories = res.objects;
      })
    );
  }

  saveProject() {
    this.isDisableBtn = true;
    this.project.last_updated_by = this.storageService.getUserName();
    this.subscription.add(
      this.projectService.updateProject(this.project).subscribe(() => {
        this.closeModal(true);
        this.isDisableBtn = false;
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
      })
    );
  }

  compareFn(r1: Category, r2: Category) {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  closeModal(data: boolean = false) {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
