import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectComment} from "../../project/project.model";
import {StudentComponent} from "../student.component";
import {ProjectService} from "../../project/project.service";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {Student} from "../student.model";
import {Constant} from "../../../shared/constant";

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projectComment: ProjectComment = new ProjectComment();
  STUDENT_STATUS = Constant.STUDENT_STATUS;
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public projectService: ProjectService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.projectComment.student = this.data.id;
    this.projectComment.project = this.data.projects.id;
    this.projectComment.last_updated_by = this.storageService.getUserName();
    this.projectComment.commented_by = Number(this.storageService.getUserId());
  }

  saveComment() {
    this.isDisableBtn = true;
    this.subscription.add(
      this.projectService.createComment(this.projectComment).subscribe(() => {
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
