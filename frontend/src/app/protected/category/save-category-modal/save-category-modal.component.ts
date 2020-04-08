import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../layout/alert/alert.service';
import {Category} from '../category.model';
import {CategoryComponent} from '../category.component';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-save-category-modal',
  templateUrl: './save-category-modal.component.html',
  styleUrls: ['./save-category-modal.component.scss']
})
export class SaveCategoryModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  category: Category = new Category();
  isEdit = false;
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    public categoryService: CategoryService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    if (this.data) {
      this.category = this.data;
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  saveCategory() {
    this.isDisableBtn = true;
    if (this.data) {
      this.editCategory();
    } else {
      this.addCategory();
    }
  }

  addCategory() {
    this.subscription.add(
      this.categoryService.addCategory(this.category).subscribe(() => {
        this.closeModal(true);
        this.isDisableBtn = false;
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
      })
    );
  }

  editCategory() {
    this.subscription.add(
      this.categoryService.updateCategory(this.category).subscribe(() => {
        this.closeModal();
        this.isDisableBtn = false;
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
      })
    );
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
