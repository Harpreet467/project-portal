import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../../app.config';
import {StorageService} from '../../shared/service/storage.service';
import {Constant} from '../../shared/constant';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  dashboardUrl = AppConfig.DASHBOARD;
  staffUrl = AppConfig.STAFF;
  isAdmin = false;

  constructor(
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    if (this.storageService.getRole()) {
      this.isAdmin = this.storageService.getRole().includes(Constant.ROLE_ADMIN);
    }
  }

}
