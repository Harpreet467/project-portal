import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountDetailsModel, LoginModel, TokenModel} from './login.model';
import {Subscription} from 'rxjs';
import {LoginService} from './login.service';
import {StorageService} from '../../shared/service/storage.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {SharedService} from '../../shared/service/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginParam: LoginModel = new LoginModel();
  subscription: Subscription = new Subscription();
  isDisableBtn = false;
  isLoggedIn = false;

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isLoggedIn && this.storageService.getUserToken()) {
      this.router.navigate([AppConfig.DASHBOARD]);
    }
  }

  login() {
    this.isDisableBtn = true;
    this.subscription.add(
      this.loginService.login(this.loginParam).subscribe((tokenModel: TokenModel) => {
        this.storageService.setUserToken(tokenModel.access_token);
        this.accountDetails();
      }, () => {
        this.isDisableBtn = false;
      })
    );
  }

  accountDetails() {
    this.subscription.add(
      this.loginService.getAccountDetails().subscribe((res: AccountDetailsModel) => {
        this.setUserData(res);
        this.sharedService.isUserLoggedIn.next(true);
        this.setRoleFlags();
        this.router.navigate([AppConfig.DASHBOARD]);
        this.isDisableBtn = false;
        this.isLoggedIn = true;
      }, () => {
        this.isDisableBtn = false;
      })
    );
  }

  setUserData(data: AccountDetailsModel) {
    this.storageService.setUserId(data.id);
    this.storageService.setUserName(data.name);
    this.storageService.setUserEmail(data.email);
    this.storageService.setRole(data.roles.toString());
  }

  setRoleFlags() {
    this.sharedService.checkAdminRole();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
