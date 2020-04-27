import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ProjectComment} from "../../project.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProposalAuthorComponent} from "../../../proposal-author/proposal-author.component";
import {ProposalAuthorService} from "../../../proposal-author/proposal-author.service";
import {AlertService} from "../../../../layout/alert/alert.service";
import {StorageService} from "../../../../shared/service/storage.service";
import {ProjectService} from "../../project.service";

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projectComment: ProjectComment = new ProjectComment();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<ProposalAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectComment,
    public projectService: ProjectService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.projectComment = this.data;
  }

  saveComment() {
    this.isDisableBtn = true;
    this.projectComment.last_updated_by = this.storageService.getUserName();
    this.projectComment.commented_by = Number(this.storageService.getUserId());
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
