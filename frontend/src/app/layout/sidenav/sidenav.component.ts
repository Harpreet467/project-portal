import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfig} from '../../app.config';
import {SharedService} from '../../shared/service/shared.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  dashboardUrl = AppConfig.DASHBOARD;
  staffUrl = AppConfig.STAFF;
  isAdmin = false;

  constructor(
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.getAdminRole();
  }

  getAdminRole() {
    this.sharedService.checkAdminRole();
    this.subscription.add(
      this.sharedService.isAdminRole.subscribe(value => {
        this.isAdmin = value;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
