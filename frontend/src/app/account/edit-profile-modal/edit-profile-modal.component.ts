import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Staff} from "../../protected/staff/staff.model";
import {StaffService} from "../../protected/staff/staff.service";
import {AlertService} from "../../layout/alert/alert.service";
import {StorageService} from "../../shared/service/storage.service";
import {SpinnerService} from "../../shared/service/spinner.service";


@Component({
  selector: 'app-add-staff-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  staff: Staff = new Staff();
  isEdit = false;
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    public staffService: StaffService,
    private alertService: AlertService,
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
        this.staff = res;
        this.spinnerService.hide();
      })
    );
  }

  saveStaff() {
    this.isDisableBtn = true;
    this.staff.last_updated_by = this.storageService.getUserName();
    this.subscription.add(
      this.staffService.updateStaff(this.staff).subscribe(() => {
        this.storageService.setUserName(this.staff.name);
        this.storageService.setUserEmail(this.staff.email);
        this.closeModal();
        this.isDisableBtn = false;
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
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
