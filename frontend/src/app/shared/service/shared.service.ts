import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {StorageService} from './storage.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Roles} from '../constant';
import {RolesModel} from "../model/roles.model";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdminRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFirstLevelRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isSecondLevelRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isThirdLevelRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getLoggedInRoles: BehaviorSubject<RolesModel> = new BehaviorSubject<RolesModel>(new RolesModel());

  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  checkLoggedIn() {
    if (this.storageService.getUserToken()) {
      this.isUserLoggedIn.next(true);
    }
  }

  checkRoles() {
    if (this.storageService.getRole()) {
      this.isAdminRole.next(this.storageService.getRole().includes(Roles.ROLE_ADMIN));
      this.isFirstLevelRole.next(this.storageService.getRole().includes(Roles.FIRST_LEVEL));
      this.isSecondLevelRole.next(this.storageService.getRole().includes(Roles.SECOND_LEVEL));
      this.isThirdLevelRole.next(this.storageService.getRole().includes(Roles.THIRD_LEVEL));
    }
  }

  refreshGetRoles() {
    const roles: RolesModel = new RolesModel();
    this.checkRoles();
    roles.isAdmin = this.storageService.getRole().includes(Roles.ROLE_ADMIN);
    roles.isFirstLevel = this.storageService.getRole().includes(Roles.FIRST_LEVEL);
    roles.isSecondLevel = this.storageService.getRole().includes(Roles.SECOND_LEVEL);
    roles.isThirdLevel = this.storageService.getRole().includes(Roles.THIRD_LEVEL);
    this.getLoggedInRoles.next(roles);
  }

  shutRoleFlags() {
    this.isUserLoggedIn.next(false);
    this.isAdminRole.next(false);
  }

  logout() {
    this.storageService.clearStorage();
    this.router.navigate([AppConfig.LOGIN]).then();
    this.shutRoleFlags();
    return this.http.get(AppConfig.LOGOUT_API);
  }

}
