import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProposalAuthorComponent} from "../proposal-author.component";
import {ProposalAuthor} from "../proposal-author.model";

@Component({
  selector: 'app-view-author-modal',
  templateUrl: './view-author-modal.component.html',
  styleUrls: ['./view-author-modal.component.scss']
})
export class ViewAuthorModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProposalAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposalAuthor
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
