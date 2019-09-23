import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {StorageService} from './storage.service';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private $localStorage: LocalStorageService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  checkLoggedIn() {
    if (this.storageService.getUserToken()) {
      this.isUserLoggedIn.next(true);
    }
  }

  logout() {
    this.storageService.setUserToken(null);
    this.storageService.setRole(null);
    this.$localStorage.clear();
    this.router.navigate([AppConfig.LOGIN]);
    this.isUserLoggedIn.next(false);
    return this.http.get(AppConfig.LOGOUT_API);
  }

}
