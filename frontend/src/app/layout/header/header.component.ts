import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { AppConfig } from '../../app.config';
import {ProgressBarService} from '../../shared/service/progress-bar.service';
import {SharedService} from '../../shared/service/shared.service';
import {StorageService} from '../../shared/service/storage.service';
import {Subscription} from 'rxjs';
import {Constant} from "../../shared/constant";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../../account/change-password/change-password.component";
import {ViewProfileDetailModalComponent} from "../../account/view-profile-detail-modal/view-profile-detail-modal.component";
import {EditProfileModalComponent} from "../../account/edit-profile-modal/edit-profile-modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggleEvent = new EventEmitter();

  subscription: Subscription = new Subscription();
  loginURL = AppConfig.LOGIN;
  isLoggedIn: boolean;
  userName: string;
  email: string;

  constructor(
    public progressBarService: ProgressBarService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.sharedService.checkLoggedIn();
    this.subscription.add(
      this.sharedService.isUserLoggedIn.subscribe(value => {
        this.isLoggedIn = value;
        this.userName = this.storageService.getUserName();
        this.email = this.storageService.getUserEmail();
      })
    );
  }

  toggleSideNav() {
    this.sideNavToggleEvent.emit();
  }

  openViewProfileModel() {
    this.dialog.open(ViewProfileDetailModalComponent, {
      width: Constant.MODAL_WIDTH,
    });
  }

  openEditProfileModel() {
    this.dialog.open(EditProfileModalComponent, {
      width: Constant.MODAL_WIDTH,
    });
  }

  openChangePasswordModel() {
    this.dialog.open(ChangePasswordComponent, {
      width: Constant.MODAL_WIDTH,
    });
  }

  logout() {
    this.sharedService.logout().subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
