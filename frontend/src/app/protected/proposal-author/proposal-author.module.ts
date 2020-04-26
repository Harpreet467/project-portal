import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalAuthorComponent } from './proposal-author.component';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SpinnerModule} from '../../layout/spinner/spinner.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterModule} from '@angular/router';
import {proposalAuthorRoutes} from './proposal-author.route';
import { ViewAuthorModalComponent } from './view-author-modal/view-author-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import { SaveAuthorModalComponent } from './save-author-modal/save-author-modal.component';
import {AlertModule} from "../../layout/alert/alert.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ProposalAuthorComponent, ViewAuthorModalComponent, SaveAuthorModalComponent],
  imports: [
    RouterModule.forChild(proposalAuthorRoutes),
    CommonModule,
    MatCardModule,
    FlexModule,
    MatDividerModule,
    MatFormFieldModule,
    SpinnerModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    AlertModule,
    FormsModule
  ]
})
export class ProposalAuthorModule { }
