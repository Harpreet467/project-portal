import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentComponent} from "../student.component";
import {Student} from "../student.model";

@Component({
  selector: 'app-view-student-modal',
  templateUrl: './view-student-modal.component.html',
  styleUrls: ['./view-student-modal.component.scss']
})
export class ViewStudentModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
