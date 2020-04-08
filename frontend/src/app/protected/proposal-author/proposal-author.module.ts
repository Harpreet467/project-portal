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



@NgModule({
  declarations: [ProposalAuthorComponent],
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
    MatPaginatorModule
  ]
})
export class ProposalAuthorModule { }
