import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {RouterModule} from "@angular/router";
import {studentRoutes} from "./student.route";
import {StudentService} from "./student.service";
import {ViewStudentModalComponent} from "./view-student-modal/view-student-modal.component";
import {SaveStudentModalComponent} from "./save-student-modal/save-student-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {AlertModule} from "../../layout/alert/alert.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {SpinnerModule} from "../../layout/spinner/spinner.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ActionModalComponent} from "./action-modal/action-modal.component";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    StudentComponent,
    ViewStudentModalComponent,
    SaveStudentModalComponent,
    ActionModalComponent
  ],
  imports: [
    RouterModule.forChild(studentRoutes),
    CommonModule,
    MatDialogModule,
    AlertModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FlexModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    SpinnerModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule { }
