import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role, RoleModel, Staff} from '../staff.model';
import {StaffComponent} from '../staff.component';
import {StaffService} from '../staff.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../../../shared/service/storage.service';


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
    public staffService: StaffService,
    private storageService: StorageService
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
      this.staffService.getRoles().subscribe((res: RoleModel) => {
        this.roles = res.objects;
      })
    );
  }

  saveStaff() {
    this.staff.last_updated_by = this.storageService.getUserName();
    if (this.data) {
      this.editStaff();
    } else {
      this.addStaff();
    }
  }

  addStaff() {
    this.subscription.add(
      this.staffService.addStaff(this.staff).subscribe((res: Staff) => {
        this.closeModal(res);
      })
    );
  }

  editStaff() {
    this.subscription.add(
      this.staffService.updateStaff(this.staff).subscribe((res: Staff) => {
        this.closeModal(res);
      })
    );
  }

  closeModal(data: Staff = null) {
    this.dialogRef.close(data);
  }

  compareFn(r1: Role, r2: Role) {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}