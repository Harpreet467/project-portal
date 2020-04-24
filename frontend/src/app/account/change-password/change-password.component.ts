import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Category} from "../../protected/category/category.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../layout/alert/alert.service";
import {ChangePasswordModel} from "./change-password.model";
import {ChangePasswordService} from "./change-password.service";
import {Messages} from "../../shared/constant";

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
    if (this.changePasswordModel.new_password === this.changePasswordModel.new_password_confirm) {
      this.subscription.add(
        this.changePasswordService.changePassword(this.changePasswordModel).subscribe(() => {
          this.closeModal(true);
          this.isDisableBtn = false;
        }, (error) => {
          this.alertService.error(error.error.message);
          this.isDisableBtn = false;
        })
      );
    } else {
      this.alertService.error(Messages.PASSWORD_NOT_MATCHED);
    }
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
