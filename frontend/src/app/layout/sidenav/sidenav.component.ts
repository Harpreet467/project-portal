import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfig} from '../../app.config';
import {SharedService} from '../../shared/service/shared.service';
import {Subscription} from 'rxjs';
import {MenuModel} from './sidenav.model';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  isAdmin = false;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getAdminRole();
  }

  getMenuItems(): MenuModel[] {
    return [
      {
        name: 'Dashboard',
        type: 'link',
        value: AppConfig.DASHBOARD,
        icon: 'home',
        visibility: true
      },
      {
        name: 'Staffs',
        type: 'link',
        value: AppConfig.STAFF,
        icon: 'people',
        visibility: this.isAdmin
      },
      {
        name: 'Projects',
        type: 'link',
        value: null,
        icon: 'bubble_chart',
        visibility: true
      },
      {
        name: 'System Profiler',
        type: 'link',
        value: AppConfig.SYSTEM_PROFILE,
        icon: 'bar_chart',
        visibility: this.isAdmin
      }
    ];
  }

  getAdminRole() {
    this.sharedService.checkAdminRole();
    this.subscription.add(
      this.sharedService.isAdminRole.subscribe(value => {
        this.isAdmin = value;
      })
    );
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
