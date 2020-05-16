import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {StudentComponent} from "../student.component";
import {Student} from "../student.model";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-save-student-modal',
  templateUrl: './save-student-modal.component.html',
  styleUrls: ['./save-student-modal.component.scss']
})
export class SaveStudentModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  student: Student = new Student();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public studentService: StudentService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.student = this.data;
  }

  saveStudent() {
    this.isDisableBtn = true;
    this.student.last_updated_by = this.storageService.getUserName();
    this.subscription.add(
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.closeModal(true);
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
