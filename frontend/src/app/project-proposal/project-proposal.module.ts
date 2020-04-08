import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {proposalAuthorRoutes} from './project-proposal.route';
import {ProposalAuthorService} from '../protected/proposal-author/proposal-author.service';
import {ProjectProposalComponent} from './project-proposal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../layout/spinner/spinner.module';
import {AlertModule} from '../layout/alert/alert.module';
import {FileUploadModule} from '../layout/file-upload/file-upload.module';



@NgModule({
  declarations: [
    ProjectProposalComponent
  ],
  imports: [
    RouterModule.forChild(proposalAuthorRoutes),
    CommonModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDividerModule,
    FlexModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    SpinnerModule,
    AlertModule,
    FileUploadModule
  ],
  providers: [
    ProposalAuthorService
  ]
})
export class ProjectProposalModule { }
