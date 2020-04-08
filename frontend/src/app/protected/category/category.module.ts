import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {categoryRoute} from './category.route';
import {CategoryComponent} from './category.component';
import {CategoryService} from './category.service';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SpinnerModule} from '../../layout/spinner/spinner.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { SaveCategoryModalComponent } from './save-category-modal/save-category-modal.component';
import {AlertModule} from '../../layout/alert/alert.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CategoryComponent,
    SaveCategoryModalComponent
  ],
  imports: [
    RouterModule.forChild(categoryRoute),
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    SpinnerModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    FlexModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatIconModule,
    AlertModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
