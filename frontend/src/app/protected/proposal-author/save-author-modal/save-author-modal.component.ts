import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {ProposalAuthorComponent} from "../proposal-author.component";
import {ProposalAuthorService} from "../proposal-author.service";
import {ProposalAuthor} from "../proposal-author.model";

@Component({
  selector: 'app-save-author-modal',
  templateUrl: './save-author-modal.component.html',
  styleUrls: ['./save-author-modal.component.scss']
})
export class SaveAuthorModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  proposalAuthor: ProposalAuthor = new ProposalAuthor();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<ProposalAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposalAuthor,
    public proposalAuthorService: ProposalAuthorService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.proposalAuthor = this.data;
  }

  saveStaff() {
    this.isDisableBtn = true;
    this.proposalAuthor.last_updated_by = this.storageService.getUserName();
    this.subscription.add(
      this.proposalAuthorService.updateProposal(this.proposalAuthor).subscribe(() => {
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
