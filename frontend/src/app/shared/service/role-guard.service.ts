import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {Constant} from '../constant';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.data.roles.some(r=> this.storageService.getRole().includes(r))) {
      return true;
    }
    this.snackBar.open(Constant.UNAUTHORIZED);
    this.location.back();
    return false;
  }

}
