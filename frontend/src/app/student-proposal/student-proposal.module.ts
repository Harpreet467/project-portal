import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProposalComponent } from './student-proposal.component';
import {RouterModule} from "@angular/router";
import {studentProposalRoutes} from "./student-proposal.route";
import {StudentService} from "../protected/student/student.service";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SpinnerModule} from "../layout/spinner/spinner.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    StudentProposalComponent
  ],
    imports: [
        RouterModule.forChild(studentProposalRoutes),
        CommonModule,
        MatCardModule,
        FlexModule,
        MatDividerModule,
        MatStepperModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        SpinnerModule,
        MatTableModule,
        MatSortModule,
        MatChipsModule,
        MatIconModule,
        MatPaginatorModule,
        MatTooltipModule
    ],
  providers: [
    StudentService
  ]
})
export class StudentProposalModule { }
