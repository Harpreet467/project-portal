import {Component, Inject, OnInit} from '@angular/core';
import {Staff} from '../staff.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {StaffComponent} from '../staff.component';

@Component({
  selector: 'app-view-staff-detail-modal',
  templateUrl: './view-staff-detail-modal.component.html',
  styleUrls: ['./view-staff-detail-modal.component.scss']
})
export class ViewStaffDetailModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Staff
  ) { }

  ngOnInit() {
  }

  closeModal(data: Staff = null) {
    this.dialogRef.close(data);
  }

}
