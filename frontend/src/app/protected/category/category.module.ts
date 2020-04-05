import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {categoryRoute} from './category.route';
import {CategoryComponent} from './category.component';
import {CategoryService} from './category.service';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    RouterModule.forChild(categoryRoute),
    CommonModule
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
