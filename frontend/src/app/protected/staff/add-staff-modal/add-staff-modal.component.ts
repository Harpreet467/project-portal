import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role, Staff} from '../staff.model';
import {StaffComponent} from '../staff.component';
import {StaffService} from '../staff.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-add-staff-modal',
  templateUrl: './add-staff-modal.component.html',
  styleUrls: ['./add-staff-modal.component.scss']
})
export class AddStaffModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  staff: Staff = new Staff();
  roles: Role[];
  isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<StaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Staff,
    public staffService: StaffService
  ) { }

  ngOnInit() {
    this.getRoles();
    if (this.data) {
      this.staff = this.data;
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  getRoles() {
    this.subscription.add(
      this.staffService.getRoles().subscribe((res: Role[]) => {
        this.roles = res;
      })
    );
  }

  saveStaff() {
    if (this.data) {
      this.addStaff();
    } else {
      this.editStaff();
    }
  }

  addStaff() {
    console.log(this.staff);
    this.subscription.add(
      this.staffService.addStaff(this.staff).subscribe(() => {
        this.closeModal();
      })
    );
  }

  editStaff() {
    this.subscription.add(
      this.staffService.updateStaff(this.staff).subscribe(() => {
        this.closeModal();
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
