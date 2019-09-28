import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {StorageService} from './storage.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Constant} from '../constant';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdminRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  checkLoggedIn() {
    if (this.storageService.getUserToken()) {
      this.isUserLoggedIn.next(true);
    }
  }

  checkAdminRole() {
    if (this.storageService.getRole()) {
      this.isAdminRole.next(this.storageService.getRole().includes(Constant.ROLE_ADMIN));
    }
  }

  shutRoleFlags() {
    this.isUserLoggedIn.next(false);
    this.isAdminRole.next(false);
  }

  logout() {
    this.storageService.clearStorage();
    this.router.navigate([AppConfig.LOGIN]);
    this.shutRoleFlags();
    return this.http.get(AppConfig.LOGOUT_API);
  }

}
