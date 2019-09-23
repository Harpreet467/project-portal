import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {Constant} from '../constant';
import {StorageService} from './storage.service';
import {AppConfig} from '../../app.config';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.storageService.getUserToken()) {
      return true;
    }
    this.snackBar.open(Constant.UNAUTHORIZED);
    this.router.navigate([AppConfig.LOGIN]);
    return false;
  }

}
