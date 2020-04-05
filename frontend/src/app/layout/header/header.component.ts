import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { AppConfig } from '../../app.config';
import {ProgressBarService} from '../../shared/service/progress-bar.service';
import {SharedService} from '../../shared/service/shared.service';
import {StorageService} from '../../shared/service/storage.service';
import {Subscription} from 'rxjs';

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

  logout() {
    this.sharedService.logout().subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
