import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {EmailLog, Project} from "../../project.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../../project.service";
import {AlertService} from "../../../../layout/alert/alert.service";
import {StorageService} from "../../../../shared/service/storage.service";
import {ProjectDetailsComponent} from "../project-details.component";
import {ProposalAuthor} from "../../../proposal-author/proposal-author.model";
import {Student} from "../../../student/student.model";

@Component({
  selector: 'app-sent-email-modal',
  templateUrl: './sent-email-modal.component.html',
  styleUrls: ['./sent-email-modal.component.scss']
})
export class SentEmailModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  emailLog: EmailLog = new EmailLog();
  projectAuthor: ProposalAuthor = new ProposalAuthor();
  student: Student= new Student();
  isDisableBtn = false;
  isAuthor = true;

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    public projectService: ProjectService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.emailLog.project = this.data.id;
    this.emailLog.sent_by = Number(this.storageService.getUserId());
    this.emailLog.last_updated_by = this.storageService.getUserName();
  }

  sendEmail() {
    this.isDisableBtn = true;

    if (this.isAuthor) {
      this.emailLog.proposal_author = this.projectAuthor.id;
      this.emailLog.email_to = this.projectAuthor.email;
    } else {
      this.emailLog.student = this.student.id;
      this.emailLog.email_to = this.student.email;
    }

    this.subscription.add(
      this.projectService.createEmailLog(this.emailLog).subscribe(() => {
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
