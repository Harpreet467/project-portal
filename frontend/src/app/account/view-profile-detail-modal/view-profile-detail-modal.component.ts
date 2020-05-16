import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Staff} from "../../protected/staff/staff.model";
import {Subscription} from "rxjs";
import {StaffService} from "../../protected/staff/staff.service";
import {StorageService} from "../../shared/service/storage.service";
import {SpinnerService} from "../../shared/service/spinner.service";

@Component({
  selector: 'app-view-staff-detail-modal',
  templateUrl: './view-profile-detail-modal.component.html',
  styleUrls: ['./view-profile-detail-modal.component.scss']
})
export class ViewProfileDetailModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  data: Staff = new Staff();

  constructor(
    public dialogRef: MatDialogRef<any>,
    private staffService: StaffService,
    public spinnerService: SpinnerService,
    private storageService: StorageService
  ) {
    this.spinnerService.show();
  }

  ngOnInit() {
    this.getStaff();
  }

  getStaff() {
    this.subscription.add(
      this.staffService.getStaff(Number(this.storageService.getUserId())).subscribe((res: Staff) => {
        this.data = res;
        this.spinnerService.hide();
      })
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
