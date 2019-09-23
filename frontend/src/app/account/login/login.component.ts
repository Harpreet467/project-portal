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

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.storageService.getUserToken()) {
      this.router.navigate([AppConfig.DASHBOARD]);
    }
  }

  login() {
    this.subscription.add(
      this.loginService.login(this.loginParam).subscribe((tokenModel: TokenModel) => {
        this.storageService.setUserToken(tokenModel.access_token);
        this.accountDetails();
      })
    );
  }

  accountDetails() {
    this.subscription.add(
      this.loginService.getAccountDetails().subscribe((res: AccountDetailsModel) => {
        this.storageService.setUserId(res.id);
        this.storageService.setUserName(res.name);
        this.storageService.setUserEmail(res.email);
        this.storageService.setRole(res.roles.toString());
        this.sharedService.isUserLoggedIn.next(true);
        this.router.navigate([AppConfig.DASHBOARD]);
        this.isDisableBtn = true;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
