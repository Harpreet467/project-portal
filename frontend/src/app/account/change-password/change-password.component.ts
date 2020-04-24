import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Category} from "../../protected/category/category.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../layout/alert/alert.service";
import {ChangePasswordModel} from "./change-password.model";
import {ChangePasswordService} from "./change-password.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  changePasswordModel: ChangePasswordModel = new ChangePasswordModel();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    public changePasswordService: ChangePasswordService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
  }

  changePassword() {
    this.subscription.add(
      this.changePasswordService.changePassword(this.changePasswordModel).subscribe(() => {
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
